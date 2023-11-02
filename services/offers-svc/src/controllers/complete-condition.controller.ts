import db from '@offers-svc/db';
import { sendCompleteOfferMessage } from '@offers-svc/queues/offer.producer';
import { Offer, OfferCondition } from '@prisma/client';
import { Request, Response } from 'express';

export async function completeConditionController(
  req: Request,
  res: Response,
): Promise<OfferCondition> {
  const conditionId = +req.params.conditionId;

  const user = req.user;

  const condition = await db.offerCondition.findUnique({
    where: { id: conditionId },
    include: { offer: { include: { process: true } } },
  });

  if (!condition) {
    throw new Error('condition not found');
  }
  if (condition.type === 'Demand') {
    const processOwnerId = condition.offer.process.ownerId;
    if (user.id !== processOwnerId) {
      throw new Error('You are not allowed to do this action');
    }
  }
  if (condition.type === 'Benefit') {
    const offerOwnerId = condition.offer.ownerId;
    if (user.id !== offerOwnerId) {
      throw new Error('You are not allowed to do this action');
    }
  }

  const updatedCondition = await db.offerCondition.update({
    where: { id: conditionId },
    data: { completed: true },
  });

  const conditions = await db.offerCondition.findMany({
    where: { offerId: condition.offerId, completed: false },
  });
  if (conditions.length === 0) {
    const updatedOffer = await db.offer.update({
      where: { id: condition.offerId },
      data: { status: 'Finished' },
      include: { offerConditions: true },
    });

    await sendCompleteOfferMessage(updatedOffer);
  }

  return updatedCondition;
}

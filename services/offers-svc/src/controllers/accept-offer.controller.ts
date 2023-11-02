import db from '@offers-svc/db';
import { sendAcceptOfferMessage } from '@offers-svc/queues/offer.producer';
import { Offer } from '@prisma/client';
import { Request, Response } from 'express';

export async function acceptOfferController(
  req: Request,
  res: Response,
): Promise<Offer> {
  const offerId = +req.params.offerId;
  const user = req.user;

  const offer = await db.offer.findUnique({
    where: { id: offerId },
    include: { process: true },
  });

  if (offer?.process.ownerId !== user.id) {
    throw new Error('You are not allowed to do that');
  }

  const foundOtherAcceptedOffers = await db.offer.findFirst({
    where: {
      processId: offer.processId,
      id: { not: { equals: offer.id } },
      status: { in: ['Accepted', 'Finished'] },
    },
  });

  if (foundOtherAcceptedOffers) {
    throw new Error('You already have accepted offer to this process!');
  }

  const updatedOffer = await db.offer.update({
    where: { id: offerId },
    data: { status: 'Accepted' },
    include: { offerConditions: true },
  });

  await sendAcceptOfferMessage(updatedOffer);

  return updatedOffer;
}

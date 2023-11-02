import db from '@offers-svc/db';
import { sendCreateOfferMessage } from '@offers-svc/queues/offer.producer';
import { SendOfferDto } from '@offers-svc/schemas/create-offer.dto';
import { Offer } from '@prisma/client';
import { Request, Response } from 'express';

export async function sendOfferController(
  req: Request,
  response: Response,
): Promise<Offer> {
  const { processId, conditions } = req.body as SendOfferDto;
  const user = req.user;
  // check if user is producer
  if (user.type !== 'PRODUCER') {
    throw new Error('You are not allowed to do this action');
  }
  const process = await db.process.findUnique({ where: { id: processId } });

  if (process?.status !== 'Published') {
    throw new Error('This process not published yet!');
  }

  const offer = await db.offer.create({
    data: {
      processId: processId,
      ownerId: user.id,
      offerConditions: {
        createMany: {
          data: conditions.map(condition => ({
            description: condition.description,
            type: condition.type,
          })),
        },
      },
    },
    include: {
      offerConditions: true,
    },
  });

  await sendCreateOfferMessage(offer);

  return offer;
}

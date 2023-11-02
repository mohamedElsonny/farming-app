import {
  Offer,
  OfferCondition,
  OfferConditionTypeEnum,
  OfferStatusEnum,
} from '@prisma/client';
import { channel } from './rabbitmq';
import {
  OFFER_ACCEPTED,
  OFFER_COMPLETED,
  OFFER_CREATED,
  OFFER_EXCHANGE,
} from './constants';
import { sendCreateEventMessage } from './event.producer';

type OfferMessage = {
  type: string;
  data: {
    id: number;
    ownerId: number;
    processId: number;
    status: OfferStatusEnum;
    offerConditions: OfferConditionsMessage[];
    createdAt: Date;
    updatedAt: Date;
  };
};

type OfferConditionsMessage = {
  id: number;
  description: string;
  offerId: number;
  completed: boolean;
  type: OfferConditionTypeEnum;
  createdAt: Date;
  updatedAt: Date;
};

export async function sendCreateOfferMessage(
  offer: Offer & { offerConditions: OfferCondition[] },
) {
  await channel.assertExchange(OFFER_EXCHANGE, 'fanout', { durable: false });

  const message: OfferMessage = {
    type: OFFER_CREATED,
    data: {
      id: offer.id,
      ownerId: offer.ownerId,
      status: offer.status,
      processId: offer.processId,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
      offerConditions: offer.offerConditions.map(c => ({
        id: c.id,
        completed: c.completed,
        description: c.description,
        offerId: c.offerId,
        type: c.type,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
    },
  };
  channel.publish(OFFER_EXCHANGE, '', Buffer.from(JSON.stringify(message)));
  await new Promise(s => setTimeout(s, 1000));
  await sendCreateEventMessage(message);
}

export async function sendAcceptOfferMessage(
  offer: Offer & { offerConditions: OfferCondition[] },
) {
  await channel.assertExchange(OFFER_EXCHANGE, 'fanout', { durable: false });

  const message: OfferMessage = {
    type: OFFER_ACCEPTED,
    data: {
      id: offer.id,
      ownerId: offer.ownerId,
      status: offer.status,
      processId: offer.processId,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
      offerConditions: offer.offerConditions.map(c => ({
        id: c.id,
        completed: c.completed,
        description: c.description,
        offerId: c.offerId,
        type: c.type,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
    },
  };
  channel.publish(OFFER_EXCHANGE, '', Buffer.from(JSON.stringify(message)));
  await sendCreateEventMessage(message);
}

export async function sendCompleteOfferMessage(
  offer: Offer & { offerConditions: OfferCondition[] },
) {
  await channel.assertExchange(OFFER_EXCHANGE, 'fanout', { durable: false });

  const message: OfferMessage = {
    type: OFFER_COMPLETED,
    data: {
      id: offer.id,
      ownerId: offer.ownerId,
      status: offer.status,
      processId: offer.processId,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
      offerConditions: offer.offerConditions.map(c => ({
        id: c.id,
        completed: c.completed,
        description: c.description,
        offerId: c.offerId,
        type: c.type,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
    },
  };
  channel.publish(OFFER_EXCHANGE, '', Buffer.from(JSON.stringify(message)));
  await sendCreateEventMessage(message);
}

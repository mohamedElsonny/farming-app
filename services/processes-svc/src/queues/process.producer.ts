import { Process, ProcessStatusEnum } from '@prisma/client';
import { channel } from './rabbitmq';
import {
  PROCESS_CREATED,
  PROCESS_EXCHANGE,
  PROCESS_PUBLISHED,
} from './constants';
import { sendCreateEventMessage } from './event.producer';

export async function sendCreateProcessMessage(process: Process) {
  await channel.assertExchange(PROCESS_CREATED, 'fanout', { durable: false });

  const message = {
    type: PROCESS_CREATED,
    data: {
      id: process.id,
      ownerId: process.ownerId,
      status: process.status,
      createdAt: process.createdAt,
      updatedAt: process.updatedAt,
    },
  };

  channel.publish(PROCESS_EXCHANGE, '', Buffer.from(JSON.stringify(message)));
  await sendCreateEventMessage(channel, message);
}

export async function sendPublishProcessMessage(process: Process) {
  await channel.assertExchange(PROCESS_PUBLISHED, 'fanout', { durable: false });

  const message = {
    type: PROCESS_PUBLISHED,
    data: {
      id: process.id,
      ownerId: process.ownerId,
      status: process.status,
      createdAt: process.createdAt,
      updatedAt: process.updatedAt,
    },
  };

  channel.publish(PROCESS_EXCHANGE, '', Buffer.from(JSON.stringify(message)));
  await sendCreateEventMessage(channel, message);
}

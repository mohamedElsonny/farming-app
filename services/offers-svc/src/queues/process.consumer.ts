import { Channel } from 'amqplib';
import {
  PROCESS_EXCHANGE,
  PROCESS_CREATED,
  PROCESS_PUBLISHED,
} from './constants';
import { Process } from '@prisma/client';
import db from '@offers-svc/db';
import { sendReceivedEventMessage } from './event.producer';

type MessageData = {
  type: string;
  data: Process;
};

export async function handleProcessMessage(channel: Channel) {
  await channel.assertExchange(PROCESS_EXCHANGE, 'fanout', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });

  channel.bindQueue(q.queue, PROCESS_EXCHANGE, '');

  channel.consume(q.queue, async data => {
    if (data) {
      const message = JSON.parse(
        Buffer.from(data.content).toString(),
      ) as MessageData;
      if (message.type === PROCESS_CREATED) {
        await db.process.create({
          data: {
            id: message.data.id,
            ownerId: message.data.ownerId,
            status: message.data.status,
            createdAt: message.data.createdAt,
            updatedAt: message.data.updatedAt,
          },
        });
      }

      if (message.type === PROCESS_PUBLISHED) {
        await db.process.update({
          where: {
            id: message.data.id,
          },
          data: {
            status: message.data.status,
            createdAt: message.data.createdAt,
            updatedAt: message.data.updatedAt,
          },
        });
      }

      channel.ack(data);
      await new Promise(s => setTimeout(s, 1000));
      await sendReceivedEventMessage(message);
    }
  });
}

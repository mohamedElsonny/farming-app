import { Channel } from 'amqplib';
import { EVENT_CREATED, EVENT_EXCHANGE, EVENT_RECEIVED } from './constants';
import db from '@events-svc/db';

type MessageData = {
  type: string;
  service: string;
  messageData: {
    type: string;
    data: any;
  };
};

const services = ['users-svc', 'offers-svc', 'processes-svc'];

export async function handleEventMessage(channel: Channel) {
  await channel.assertExchange(EVENT_EXCHANGE, 'fanout', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });

  channel.bindQueue(q.queue, EVENT_EXCHANGE, '');

  channel.consume(q.queue, async data => {
    if (data) {
      const message = JSON.parse(
        Buffer.from(data.content).toString(),
      ) as MessageData;
      if (message.type === EVENT_CREATED) {
        for await (const service of services) {
          const messageSlug = `${service}__${message.messageData.type}__${message.messageData.data.id}`;
          await db.event.create({
            data: {
              type: message.messageData.type,
              data: message.messageData.data,
              slug: messageSlug,
              service,
            },
          });
        }
      }

      if (message.type === EVENT_RECEIVED) {
        const messageSlug = `${message.service}__${message.messageData.type}__${message.messageData.data.id}`;
        const event = await db.event.findUnique({
          where: {
            slug: messageSlug,
          },
        });
        if (event) {
          await db.event.update({
            where: {
              id: event.id,
            },
            data: {
              received: true,
            },
          });
        }
      }
      channel.ack(data);
    }
  });
}

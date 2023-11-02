import { Channel } from 'amqplib';
import { USER_EXCHANGE, USER_CREATED } from './constants';
import { User } from '@prisma/client';
import db from '@offers-svc/db';
import { sendReceivedEventMessage } from './event.producer';

type MessageData = {
  type: string;
  data: User;
};

async function handleCreateUserMessage(channel: Channel) {
  await channel.assertExchange(USER_EXCHANGE, 'fanout', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });

  channel.bindQueue(q.queue, USER_EXCHANGE, '');

  channel.consume(q.queue, async data => {
    if (data) {
      const message = JSON.parse(
        Buffer.from(data.content).toString(),
      ) as MessageData;
      if (message.type === USER_CREATED) {
        await db.user.create({
          data: {
            id: message.data.id,
            name: message.data.name,
            type: message.data.type,
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

export default handleCreateUserMessage;

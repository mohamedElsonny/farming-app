import { User } from '@prisma/client';
import { channel } from './rabbitmq';
import { USER_EXCHANGE, USER_CREATED } from './constants';
import { sendCreateEventMessage } from './event.producer';

export async function sendCreateUserMessage(user: Omit<User, 'password'>) {
  await channel.assertExchange(USER_EXCHANGE, 'fanout', { durable: false });

  const message = {
    type: USER_CREATED,
    data: user,
  };

  channel.publish(USER_EXCHANGE, '', Buffer.from(JSON.stringify(message)));
  await sendCreateEventMessage(channel, message);
}

import { Channel } from 'amqplib';
import {
  EVENT_CREATED,
  EVENT_EXCHANGE,
  EVENT_RECEIVED,
  SERVICE_NAME,
} from './constants';

type EventMessage = {
  type: string;
  data: any;
};

export async function sendCreateEventMessage(
  channel: Channel,
  message: EventMessage,
) {
  await channel.assertExchange(EVENT_EXCHANGE, 'fanout', { durable: false });

  const m = {
    type: EVENT_CREATED,
    messageData: message,
  };
  channel.publish(EVENT_EXCHANGE, '', Buffer.from(JSON.stringify(m)));
}

export async function sendReceivedEventMessage(
  channel: Channel,
  message: EventMessage,
) {
  await channel.assertExchange(EVENT_EXCHANGE, 'fanout', { durable: false });

  const m = {
    type: EVENT_RECEIVED,
    service: SERVICE_NAME,
    messageData: message,
  };

  channel.publish(EVENT_EXCHANGE, '', Buffer.from(JSON.stringify(m)));
}

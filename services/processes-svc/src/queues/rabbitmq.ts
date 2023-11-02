import { connect, Channel } from 'amqplib';
import handleCreateUserMessage from './user.consumer';
import { ENV } from '@processes-svc/config';

export let channel: Channel;
export const connectRabbitMQ = async (): Promise<void> => {
  try {
    const connection = await connect({
      hostname: ENV.RABBITMQ_HOST, // RabbitMQ server hostname
      port: +ENV.RABBITMQ_PORT, // RabbitMQ server port
      username: ENV.RABBITMQ_USERNAME, // RabbitMQ username
      password: ENV.RABBITMQ_PASSWORD, // RabbitMQ password
    });

    channel = await connection.createChannel();

    console.log('RabbitMQ connected');
    await handleCreateUserMessage(channel);
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
  }
};

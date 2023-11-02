import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  DOMAIN: z.string(),
  PORT: z.optional(z.string()).default('4002'),
  RABBITMQ_USERNAME: z.string(),
  RABBITMQ_PASSWORD: z.string(),
  RABBITMQ_HOST: z.string(),
  RABBITMQ_PORT: z.string(),
});

export const ENV = envSchema.parse(process.env);

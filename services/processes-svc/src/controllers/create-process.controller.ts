import { Process } from '@prisma/client';
import db from '@processes-svc/db';
import { sendCreateProcessMessage } from '@processes-svc/queues/process.producer';
import { CreateProcessDto } from '@processes-svc/schemas/create-process.dto';
import { Request, Response } from 'express';

export async function createProcessController(
  req: Request,
  res: Response,
): Promise<Process> {
  const { title, location, landDistance } = req.body as CreateProcessDto;
  const user = req.user;
  if (user.type !== 'FARMER') {
    throw new Error('You are not allowed to do this action!');
  }

  const process = await db.process.create({
    data: {
      title,
      location,
      landDistance,
      ownerId: +req.userId,
    },
  });

  await sendCreateProcessMessage(process);

  return process;
}

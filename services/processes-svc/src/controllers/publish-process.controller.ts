import { Process } from '@prisma/client';
import db from '@processes-svc/db';
import { sendPublishProcessMessage } from '@processes-svc/queues/process.producer';
import { Request, Response } from 'express';

export async function publishProcessController(
  req: Request,
  res: Response,
): Promise<Process | null> {
  const processId = +req.params.id;
  const user = req.user;
  if (!processId) {
    throw new Error(`Invalid process id of ${processId}`);
  }
  const process = await db.process.findUnique({ where: { id: +processId } });
  if (!process) {
    throw new Error('process not found');
  }
  if (process.ownerId !== req.user.id) {
    throw new Error('You are not allowed to do this action');
  }

  const updatedProcess = await db.process.update({
    where: { id: processId },
    data: { status: 'Published' },
  });

  await sendPublishProcessMessage(updatedProcess);

  return updatedProcess;
}

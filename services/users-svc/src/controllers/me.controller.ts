import { User } from '@prisma/client';
import { Request, Response } from 'express';

export async function meController(req: Request, res: Response): Promise<User> {
  return req.user;
}

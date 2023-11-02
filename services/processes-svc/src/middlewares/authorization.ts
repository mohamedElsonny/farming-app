import { UserType } from '@prisma/client';
import { ENV } from '@processes-svc/config';
import db from '@processes-svc/db';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new Error('Not Authorized');
    }
    const data = jwt.verify(token, ENV.JWT_SECRET) as {
      user_id: string;
      user_type: UserType;
    };
    req.userId = data.user_id;
    req.userType = data.user_type;

    const user = await db.user.findUniqueOrThrow({
      where: { id: +data.user_id },
    });
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(403).json({
        succeed: false,
        error: err.message,
        data: null,
      });
    }
    res.status(500).json({
      succeed: false,
      error: err,
      data: null,
    });
  }
};

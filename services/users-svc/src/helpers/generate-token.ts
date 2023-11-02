import { User } from '@prisma/client';
import { ENV } from '@users-svc/config';
import jwt from 'jsonwebtoken';

export function generateToken(user: Omit<User, 'password'>): string {
  const token = jwt.sign(
    { sub: user.id, user_id: user.id, user_type: user.type },
    ENV.JWT_SECRET,
    { expiresIn: 1000 * 60 * 60 * 24 * 7 },
  );

  return token;
}

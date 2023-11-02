import { User, UserType } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userType: UserType;
      user: User;
    }
  }
}

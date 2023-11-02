import { Request, Response } from 'express';
import db from '@users-svc/db';
import { SignupDto } from '@users-svc/schemas/auth.schema';
import { generateToken } from '@users-svc/helpers/generate-token';
import { saveToCookies } from '@users-svc/helpers/save-to-cookies';
import { encryptPassword } from '@users-svc/helpers/encrypt-password';
import { sendCreateUserMessage } from '@users-svc/queues';

export async function signupController(req: Request, res: Response) {
  const { email, name, password, type } = req.body as SignupDto;
  // check if email is in use
  const foundUser = await db.user.findUnique({ where: { email } });
  if (foundUser) {
    throw new Error(`User ${foundUser.email} is already exists`);
  }

  // encrypt password
  const hashedPass = await encryptPassword(password);

  // save user and password
  const { password: _password, ...savedUser } = await db.user.create({
    data: { email, name, password: hashedPass, type },
  });

  await sendCreateUserMessage(savedUser);

  // get a token
  const token = generateToken(savedUser);

  // save token to cookies
  saveToCookies(res, token);

  return {
    id: savedUser.id,
    name: savedUser.name,
    email: savedUser.email,
    type: savedUser.type,
  };
}

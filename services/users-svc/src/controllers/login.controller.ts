import db from '@users-svc/db';
import { LoginDto } from '@users-svc/schemas/auth.schema';
import { Request, Response } from 'express';
import { generateToken } from '@users-svc/helpers/generate-token';
import { saveToCookies } from '@users-svc/helpers/save-to-cookies';
import { comparePassword } from '@users-svc/helpers/compare-password';

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body as LoginDto;

  // check if email is exists
  const userFound = await db.user.findUnique({ where: { email } });
  if (!userFound) {
    throw new Error('Email or password are invalid!');
  }

  // compare password
  const isMatch = await comparePassword(password, userFound.password);
  if (!isMatch) {
    throw new Error('Email or password are invalid!');
  }

  // generate token
  const token = generateToken(userFound);

  // save token to cookies
  saveToCookies(res, token);

  // send back id and email

  return {
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    type: userFound.type,
  };
}

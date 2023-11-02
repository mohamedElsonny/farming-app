import { ENV } from '@users-svc/config';
import { Response } from 'express';

export function saveToCookies(res: Response, token: string) {
  res.cookie('access_token', token, {
    domain: ENV.DOMAIN,
    httpOnly: true,
    path: '/',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
}

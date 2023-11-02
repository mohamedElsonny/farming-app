import { Router } from 'express';
import { signupController } from '@users-svc/controllers/signup.controller';
import { validate } from '@users-svc/middlewares/validate';
import {
  LoginDtoSchema,
  SignupDtoSchema,
} from '@users-svc/schemas/auth.schema';
import { loginController } from '@users-svc/controllers/login.controller';
import { controllerWrapper } from '@users-svc/helpers/controller-wrapper';
import { authorization } from '@users-svc/middlewares/authorization';
import { meController } from '@users-svc/controllers/me.controller';
const authRouter = Router();

authRouter.post(
  '/signup',
  validate(SignupDtoSchema),
  controllerWrapper(signupController),
);
authRouter.post(
  '/login',
  validate(LoginDtoSchema),
  controllerWrapper(loginController),
);
authRouter.get('/me', authorization, controllerWrapper(meController));

export default authRouter;

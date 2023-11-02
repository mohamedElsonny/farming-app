import { createProcessController } from '@processes-svc/controllers/create-process.controller';
import { publishProcessController } from '@processes-svc/controllers/publish-process.controller';
import { controllerWrapper } from '@processes-svc/helpers/controller-wrapper';
import { authorization } from '@processes-svc/middlewares/authorization';
import { validate } from '@processes-svc/middlewares/validate';
import { CreateProcessDtoSchema } from '@processes-svc/schemas/create-process.dto';
import { Router } from 'express';

const processRouter = Router();

processRouter.post(
  '/create',
  authorization,
  validate(CreateProcessDtoSchema),
  controllerWrapper(createProcessController),
);

processRouter.patch(
  '/publish/:id',
  authorization,
  controllerWrapper(publishProcessController),
);

export default processRouter;

import { acceptOfferController } from '@offers-svc/controllers/accept-offer.controller';
import { completeConditionController } from '@offers-svc/controllers/complete-condition.controller';
import { sendOfferController } from '@offers-svc/controllers/create-offer.controller';
import { controllerWrapper } from '@offers-svc/helpers/controller-wrapper';
import { authorization } from '@offers-svc/middlewares/authorization';
import { validate } from '@offers-svc/middlewares/validate';
import { SendOfferDtoSchema } from '@offers-svc/schemas/create-offer.dto';
import { Router } from 'express';

const offerRouter = Router();

offerRouter.post(
  '/create',
  authorization,
  validate(SendOfferDtoSchema),
  controllerWrapper(sendOfferController),
);

offerRouter.patch(
  '/accept/:offerId',
  authorization,
  controllerWrapper(acceptOfferController),
);

offerRouter.patch(
  '/condition/:conditionId',
  authorization,
  controllerWrapper(completeConditionController),
);

export default offerRouter;

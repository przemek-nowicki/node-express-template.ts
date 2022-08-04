import { Router } from 'express';

import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} from './user.controller';
import createUserValidation from './createUser.validation';

const router: Router = Router();

// e.g. createUser request's body is validated and protected by api-key
router.post(
  '/user/',
  [protectedByApiKey, validation(createUserValidation)],
  createUser,
);
router.get('/user/:id', readUser);
router.put('/user/:id', [protectedByApiKey], updateUser);
router.delete('/user/:id', [protectedByApiKey], deleteUser);

export default router;

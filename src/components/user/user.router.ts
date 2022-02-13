import { Router } from 'express';

import {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} from './user.controller';

const router: Router = Router();

router.post('/user/', createUser);
router.get('/user/:id', readUser);
router.put('/user/', updateUser);
router.delete('/user/', deleteUser);

export default router;

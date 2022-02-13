import { Router } from 'express';

import healthCheck from '@components/healthcheck/healthCheck.router';
import user from '@components/user/user.router';

const router: Router = Router();
router.use(healthCheck);
router.use(user);

export default router;

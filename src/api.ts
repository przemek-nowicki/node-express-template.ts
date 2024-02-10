import { Router } from 'express';

import healthCheck from '@components/healthcheck/healthCheck.router';
import user from '@components/user/user.router';
import secureTestData from '@components/secure/test.router';

const router: Router = Router();
router.use(healthCheck);
router.use(user);
router.use(secureTestData);

export default router;

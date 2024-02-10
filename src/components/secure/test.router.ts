import { Router } from 'express';

import mtls from '@core/middlewares/mtls.middleware';
import testData from './test.controller';

const router: Router = Router();

router.get('/secure/test-data', [mtls], testData);

export default router;

import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import consts from '@config/consts';
import config from '@config/config';
import {
  swaggerForbidden,
  swaggerBasePath,
} from '@core/middlewares/swagger.middleware';

const router: Router = Router();

if (config.env !== 'production') {
  router.use(consts.API_DOCS_PATH, swaggerUi.serve, swaggerBasePath);
} else {
  router.use(consts.API_DOCS_PATH, swaggerForbidden);
}

export default router;

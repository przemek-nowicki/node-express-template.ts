import express, { Application } from 'express';

import api from 'api';
import consts from '@config/consts';
import httpLogger from '@core/utils/httpLogger';
import errorHandling from '@core/middlewares/errorHandling.middleware';
import http404 from '@components/404/404.router';
import swaggerApiDocs from '@components/swagger-ui/swagger.router';

const app: Application = express();

app.use(httpLogger.successHandler);
app.use(httpLogger.errorHandler);
app.use(express.json());
app.use(consts.API_ROOT_PATH, api);
app.use(swaggerApiDocs);
app.use(http404);

app.use(errorHandling);

export default app;

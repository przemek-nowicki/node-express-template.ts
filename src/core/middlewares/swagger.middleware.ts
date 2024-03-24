import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import swaggerUi from 'swagger-ui-express';

import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import consts from '@config/consts';
import config from '@config/config';
import swaggerDocument from '../../swagger.json';

const swaggerForbidden = () => {
  logger.error('Trying to access swagger docs on production');
  throw new AppError(
    httpStatus.FORBIDDEN,
    'API docs are not available on production',
  );
};

const swaggerBasePath = (req: Request, res: Response, next: NextFunction) => {
  const basePath: string = req.originalUrl.replace(consts.API_DOCS_PATH, '');
  swaggerDocument.basePath = basePath;
  swaggerDocument.info.version = config.projectVersion;
  // Check if the request is made over HTTPS and ensure only "https" remains in the schemes
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    swaggerDocument.schemes = ['https'];
  }
  swaggerUi.setup(swaggerDocument)(req, res, () => {
    next();
  });
};

export { swaggerBasePath, swaggerForbidden };

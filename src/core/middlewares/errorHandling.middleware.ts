import { Request, Response, NextFunction } from 'express';

import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import errorHandler from '@core/utils/errorHandler';

// catch all unhandled errors
// eslint-disable-next-line
const errorHandling = (error: Error, req: Request, res: Response, next:NextFunction) => {
  errorHandler.handleError(error);
  const isTrusted = errorHandler.isTrustedError(error);
  const httpStatusCode = isTrusted
    ? (error as AppError).httpCode
    : httpStatus.INTERNAL_SERVER_ERROR;
  const responseError = isTrusted
    ? error.message
    : httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  res.status(httpStatusCode).json({
    error: responseError,
  });
};

export default errorHandling;

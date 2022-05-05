import { Server } from 'http';
import RnR from 'runtime-node-refresh';

import app from '@app';
import config from '@config/config';
import logger from '@core/utils/logger';
import errorHandler from 'core/utils/errorHandler';

const { port } = config;

const setLoggerLevel = (): void => {
  const avbLogLevels = [
    'error',
    'warn',
    'info',
    'http',
    'verbose',
    'debug',
    'silly',
  ];

  let currentLogLevel: number = logger.levels[logger.level];

  logger.info(`Logger level is set to ${logger.level}`);

  // Refresh log level
  RnR(() => {
    const found = Object.entries(logger.levels).find(
      ([, value]) => value === currentLogLevel,
    );
    if (found.length) {
      logger.info(`Switch logger level from ${logger.level} to ${found[0]}`);
      logger.level = found[`${0}`];
    }
    if (currentLogLevel < avbLogLevels.length - 1) {
      currentLogLevel += 1;
    } else {
      currentLogLevel = 0;
    }
  });
};

const exitHandler = (): void => {
  if (app) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error): void => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    exitHandler();
  }
};

const server: Server = app.listen(port, (): void => {
  logger.info(`Aapplication listens on PORT: ${port}`);
  setLoggerLevel();
});

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

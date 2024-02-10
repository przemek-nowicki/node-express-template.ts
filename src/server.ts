import https, { Server } from 'https';
import app from '@app';
import config from '@config/config';
import logger from '@core/utils/logger';
import errorHandler from 'core/utils/errorHandler';
import { NetHttpsServerOptions } from '@core/interfaces/netHttpsServer';

const { port, ptojectName } = config;

const options: NetHttpsServerOptions = {
  key: config.mTlsServerKey,
  cert: config.mTlsServerCert,
  ca: config.mTlsCaCert,
  requestCert: true,
  rejectUnauthorized: false,
};

const server: Server = https.createServer(options, app);

server.listen(port, () => {
  logger.info(`Application '${ptojectName}' listens on PORT: ${port}`);
});

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

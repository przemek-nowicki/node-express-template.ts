import winston from 'winston';

import config from '@config/config';

const errorStackFormat = winston.format((info) => {
  if (info instanceof Error) {
    return {
      ...info,
      stack: info.stack,
      message: info.message,
    };
  }
  return info;
});
const errorTemplate = ({ timestamp, level, message, stack }) => {
  let tmpl = `${timestamp} ${level}: ${message}`;
  if (stack) tmpl += ` \n ${stack}`;
  return tmpl;
};
const logger: winston.Logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    errorStackFormat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    config.env === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(errorTemplate),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;

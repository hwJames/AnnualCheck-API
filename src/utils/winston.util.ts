import { join } from 'path';
import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { rootPath } from '@constants';

const { combine, timestamp, printf, label } = format;

// log 포멧
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// 원하는 log level 만 나오게 할 때 사용
const levelFilter = (level) =>
  format((info) => {
    if (info.level != level) {
      return false;
    }
    return info;
  })();

//  log 폴더 위치
const logDir = join(rootPath, 'logs');

// console log setting
const consoleTransport = new transports.Console({
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

// debug level file log setting
const debugTransport = new winstonDaily({
  filename: 'debug-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: join(logDir, 'debug'),
  level: 'debug',
  maxSize: '5m',
  maxFiles: '10d',
  format: combine(
    levelFilter('debug'),
    label({ label: 'Golmok' }),
    timestamp(),
    logFormat,
  ),
});

// info level file log setting
const infoTransport = new winstonDaily({
  filename: 'info-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: join(logDir, 'info'),
  level: 'info',
  maxSize: '5m',
  maxFiles: '10d',
  format: combine(
    levelFilter('info'),
    label({ label: 'Golmok' }),
    timestamp(),
    logFormat,
  ),
});

// error level file log setting
const errorTransport = new winstonDaily({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: join(logDir, 'error'),
  level: 'error',
  maxSize: '5m',
  maxFiles: '10d',
  format: combine(
    levelFilter('error'),
    label({ label: 'Golmok' }),
    timestamp(),
    logFormat,
  ),
});

const logger = WinstonModule.createLogger({
  transports: [consoleTransport, debugTransport, infoTransport, errorTransport],
});

// morgan 연동을 위한 func
const stream = {
  write: (message: string) => {
    logger.log(message);
  },
};

export { logger, stream };

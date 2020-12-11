import { Injectable } from '@nestjs/common';
import { WinstonModuleOptionsFactory } from 'nest-winston';
import { LoggerOptions, transports, format } from 'winston';

const { label, json, timestamp, align, printf, colorize } = format;

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  async createWinstonModuleOptions(): Promise<LoggerOptions> {
    return {
      ...logOptions,
    };
  }
}

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow',
  },
};
const alignColorsAndTime = format.combine(
  colorize({
    all: true,
    colors: config.colors,
  }),
  label({
    label: '[LOGGER]',
  }),
  timestamp({
    format: 'YY-MM-DD HH:MM:SS',
  }),
  printf(
    (info) =>
      ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
  ),
);

export const logOptions = {
  levels: config.levels,
  format: format.combine(
    json(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    printf(({ level, message, timestamp }) => {
      return `{\n\ttimestamp: ${timestamp},\n\tlevel: ${level},\n\tmessage: ${message}\n},`;
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), alignColorsAndTime),
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
    }),
    new transports.File({
      filename: 'logs/debug.log',
      level: 'debug',
    }),
    new transports.File({
      filename: 'logs/verbose.log',
      level: 'verbose',
    }),
  ],
};

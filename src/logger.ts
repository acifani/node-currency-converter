import * as winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.simple(),
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  transports: [new winston.transports.Console()],
})

export const stream = {
  write: (message: string) => logger.info(message),
}

export default logger

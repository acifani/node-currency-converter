import * as winston from 'winston'
import config from './config'

const logger = winston.createLogger({
  format: winston.format.simple(),
  level: ['production', 'test'].includes(config.mode) ? 'error' : 'debug',
  transports: [new winston.transports.Console()],
})

export const stream = {
  write: (message: string) => logger.info(message),
}

export default logger

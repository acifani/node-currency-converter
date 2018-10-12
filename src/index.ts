import app from './app'
import config from './config'
import logger from './logger'

app.listen(config.port, () => {
  logger.info(`Listening on port: ${config.port}`)
})

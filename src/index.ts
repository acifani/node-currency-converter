import app from './app'
import config from './config'
import logger from './logger'
import warmup from './warmup'

app.listen(config.port, () => {
  logger.info(`Listening on port: ${config.port}`)
  warmup().catch(_ => process.exit(1))
})

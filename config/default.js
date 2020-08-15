/**
 * The configuration file.
 */

module.exports = {
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    PORT: process.env.PORT || 3000,
    API_VERSION: process.env.API_VERSION || 'v1',

    KAFKA_TOPIC: 'bond007',
     
    // health check timeout in milliseconds
    HEALTH_CHECK_TIMEOUT: process.env.HEALTH_CHECK_TIMEOUT || 3000,
    esConfig: {
      HOST: process.env.ES_HOST || 'http://localhost:9200',
      ES_INDEX: process.env.ES_INDEX || 'libraryqaz',
      ES_TYPE: process.env.ES_TYPE || 'doc'
    }
  }
/**
 * The configuration file.
 */

module.exports = {
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    PORT: process.env.PORT || 3000,
    API_VERSION: process.env.API_VERSION || 'v1',
     
    // health check timeout in milliseconds
    HEALTH_CHECK_TIMEOUT: process.env.HEALTH_CHECK_TIMEOUT || 3000,
    
  }
/**
 * The application entry point
 */

require('./app-bootstrap')

const _ = require('lodash')
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const HttpStatus = require('http-status-codes')
const logger = require('./src/common/logger')
const helper = require('./src/common/helper')
const { handler } = require('./src/services/processorService')

// setup express app
const app = express()

app.use(cors({
  exposedHeaders: [
    'X-Prev-Page',
    'X-Next-Page',
    'X-Page',
    'X-Per-Page',
    'X-Total',
    'X-Total-Pages',
    'Link'
  ]
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', config.PORT)

// Register routes
require('./app-routes')(app)

// The error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.logFullError(err, req.signature || `${req.method} ${req.url}`)
  const errorResponse = {}
  const status = err.isJoi ? HttpStatus.BAD_REQUEST : (err.httpStatus || _.get(err, 'response.status') || HttpStatus.INTERNAL_SERVER_ERROR)

  if (_.isArray(err.details)) {
    if (err.isJoi) {
      _.map(err.details, (e) => {
        if (e.message) {
          if (_.isUndefined(errorResponse.message)) {
            errorResponse.message = e.message
          } else {
            errorResponse.message += `, ${e.message}`
          }
        }
      })
    }
  }

  if (_.isUndefined(errorResponse.message)) {
    if (err.message && status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      errorResponse.message = err.message
    } else {
      errorResponse.message = 'Internal server error'
    }
  }

  res.status(status).json(errorResponse)
})

app.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`)
  try {
    const consumer = helper.getConsumer()
    consumer.on('message', (msg) => handler(msg))
    consumer.on('error', (msg) => console.log(msg))
  } catch (e) {
    console.log(e)
  }
})

module.exports = app

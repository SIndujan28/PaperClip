const kafka = require('kafka-node')
const config = require('config')
const _ = require('lodash')
const { Client } = require('@elastic/elasticsearch')

/**
 * @returns {object} kafka Client Instance
 */
let kafkaClient
function getKafkaClient () {
  if (!kafkaClient) {
    kafkaClient = new kafka.KafkaClient({
      connectTimeout: 2000,
      requestTimeout: 2000,
      autoConnect: true
    })
    kafkaClient.on('ready', () => {
      console.log('kafka client is ready')
    })
    return kafkaClient
  }
  return kafkaClient
}

/**
 * elasticsearch client mapping
 */
const esClient = {}
/**
 *
 * @returns {Object} elasticsearch instance
 */
function getESClient () {
  const esHost = config.get('esConfig.HOST')
  if (!esClient.client) {
    esClient.client = new Client({
      node: esHost
    })
  }
  return esClient.client
}

/**
 * wrap async function to standard express function
 * @param {Function} fn the async function
 * @returns {Function} the wrapped function
 */
function wrapExpress (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

/**
 * wrap all function from object
 * @param obj the object which controller exports
 * @returns {Object|Array} the wrapped object
 */
function autoWrapExpress (obj) {
  if (_.isArray(obj)) {
    console.log(obj.map((i) => i.toString()))
    obj.map(wrapExpress)
  }

  if (_.isFunction(obj)) {
    if (obj.constructor.name === 'AsyncFunction') {
      console.log('hi')
      return wrapExpress(obj)
    }
    return obj
  }
  _.each(obj, (value, key) => {
    obj[key] = autoWrapExpress(value)
  })
  return obj
}

/**
 * Create Kafka Topic
 * @param {Object} Object the topic object with config
 *
 */
function createTopics (topics) {
  const client = getKafkaClient()
  const admin = new kafka.Admin(client)
  return new Promise((resolve, reject) => {
    admin.createTopics(topics, (_, res) => {
      if (res) {
        return reject(res)
      }
      return resolve({})
    })
  })
}

function getAllTopics () {
  const client = getKafkaClient()
  const admin = new kafka.Admin(client)
  return new Promise((resolve, reject) => {
    admin.listTopics((err, res) => {
      if (res) {
        return resolve(res)
      }
      return reject(err)
    })
  })
}

function getConsumer () {
  try {
    const client = getKafkaClient()
    const Consumer = kafka.Consumer
    const consumer = new Consumer(client, [{ topic: config.get('KAFKA_TOPIC') }])
    return consumer
  } catch (e) {
    console.log(e)
    return e
  }
}

module.exports = {
  wrapExpress,
  autoWrapExpress,
  getKafkaClient,
  getAllTopics,
  createTopics,
  getConsumer,
  getESClient
}

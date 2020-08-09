const kafka = require('kafka-node')
const errors = require('./errors')
const _ = require('lodash')
const promise = require('bluebird')

/**
 * @returns {object} kafka Client Instance
 */
let kafkaClient
function getKafkaClient() {
    if(!kafkaClient) {
        kafkaClient= new kafka.KafkaClient()
    }
    return kafkaClient
}



/**
 * wrap async function to standard express function
 * @param {Function} fn the async function
 * @returns {Function} the wrapped function
 */
function wrapExpress(fn) {
    return function(req,res,next) {
        fn(req,res,next).catch(next)
    }
}

/**
 * wrap all function from object
 * @param obj the object which controller exports
 * @returns {Object|Array} the wrapped object
 */
function autoWrapExpress(obj) {
    if(_.isArray(obj)) {
        console.log(obj.map((i) => i.toString()))
        obj.map(wrapExpress)
    }
    
    if(_.isFunction(obj)) {
        if(obj.constructor.name === 'AsyncFunction') {
            console.log('hi')
            return wrapExpress(obj)
        }
        return obj
    }
    _.each(obj, (value,key) => {
        obj[key] = autoWrapExpress(value)
    })
    return obj
}

/**
 * Create Kafka Topic
 * @param {Object} Object the topic object with config
 * 
 */
function createTopics(topic) {
    const client = getKafkaClient()
    const promisedCreateTopic=promise.promisify(client.createTopics, {context: client})
    const res=promisedCreateTopic(topic)
    console.log(res)
    return res
}

 function getAllTopics() {
    const client=getKafkaClient()
    const admin=new kafka.Admin(client)
    const promisedList = promise.promisify(admin.listTopics,{context: admin})
    const res= promisedList()
    return res
}

module.exports = {
    wrapExpress,
    autoWrapExpress,
    getKafkaClient,
    getAllTopics,
    createTopics
}
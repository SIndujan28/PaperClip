const errors = require('../common/errors')
const helper = require('../common/helper')
const logger = require('../common/logger')
 function getTopics() {
    const results = helper.getAllTopics()
    return results
}

function createTopics() {
    const results = helper.createTopics([{
        topic: 'topic1',
        partitions: 1,
        replicationFactor: 1
      }])
    return results
}
module.exports = {
    getTopics,
    createTopics
}

logger.buildService(module.exports)
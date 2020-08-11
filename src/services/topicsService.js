const errors = require('../common/errors')
const helper = require('../common/helper')
const logger = require('../common/logger')
 function getTopics() {
    const results = helper.getAllTopics()
    return results
}

async function createTopics(data) {
    try{
        const results =await helper.createTopics(data)
          return results
    }catch(e) {
        return  new errors.BadRequestError(`${e.map(i => i.error)}`)
    }
}


module.exports = {
    getTopics,
    createTopics
}

logger.buildService(module.exports)
const helper = require('./common/helper')
const config = require('config')
const logger = require('./common/logger')
const client = helper.getESClient()

async function run() {
    const {body} =await client.indices.exists({
        index: config.esConfig.ES_INDEX,
    })
    if(body) {
        logger.info(`The index ${config.esConfig.ES_INDEX} already exists`)
    }
    else {
        logger.info(`The index ${config.esConfig.ES_INDEX} will be created`)
        await client.indices.create({
            index: config.esConfig.ES_INDEX
        })
    }
   
}
run().then(() => logger.info('done')).catch(e => logger.error(e))
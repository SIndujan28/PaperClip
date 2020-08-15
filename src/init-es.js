const helper = require('./common/helper')
const config = require('config')
const logger = require('./common/logger')
const client = helper.getESClient()

async function run() {
    if (process.argv.length === 3 && process.argv[2] === 'force') {
        logger.info(`Delete index ${config.esConfig.ES_INDEX} if any.`)
        try {
          await client.indices.delete({ index: config.esConfig.ES_INDEX })
        } catch (err) {
          // ignore
        }
      }
    const {body} =await client.indices.exists({
        index: config.esConfig.ES_INDEX,
    })
    if(body) {
        logger.info(`The index ${config.esConfig.ES_INDEX} already exists`)
        
    }
    else {
        logger.info(`The index ${config.esConfig.ES_INDEX} will be created`)
        await client.indices.create({
            index: config.esConfig.ES_INDEX,
            body: {
                mappings: {
                        properties: {
                            status: { type: 'text' },
                          }
                }
              }
        })
    }
   
}
run().then(() => logger.info('done')).catch(e => logger.error(e))
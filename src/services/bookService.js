const helper = require('../common/helper')
const config = require('config')
const logger = require('../common/logger')

const client = helper.getESClient()

async function searchBooks (query) {
  console.log(query)
  const result = await client.search({
    index: config.get('esConfig.ES_INDEX'),
    body: {
      query: {
        match: {
          keywords: query.keyword
        }
      }
    }
  })
  console.log(result.body.hits)
  return result.body.hits.hits
}

module.exports = {
  searchBooks
}

logger.buildService(module.exports)

const helper = require('../common/helper')
const config = require('config')
const {v4:uuidv4} = require('uuid')
const client = helper.getESClient()

async function create(message) {
    console.log(message)
    const result = await client.index({
        index: config.get('esConfig.ES_INDEX'),
        body: message
    })
    console.log(message)
    console.log(result)
    return result
}

async function handler(obj) {
    console.log(obj)
    const j = JSON.parse(obj.value)
    const result=await create(j)
    console.log(result)
    return result
}
module.exports = {
    handler
}

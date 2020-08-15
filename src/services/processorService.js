const helper = require('../common/helper')
const config = require('config')
const {v4:uuidv4} = require('uuid')
const client = helper.getESClient()

async function create(id,message) {
    console.log(message)
    const result = await client.create({
        id:uuidv4(),
        index: config.get('esConfig.ES_INDEX'),
        body: message
    })
    console.log(message)
    console.log(result)
    return result
}

async function handler(obj) {
    let i =0
    console.log(obj)
    const l = {
        status: obj.value
    }
    console.log(i)
    const result=await create(i++,l)
    console.log(result)
    return result
}
module.exports = {
    handler
}

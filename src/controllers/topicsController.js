const service = require('../services/topicsService')

/**
 * Get all topics
 * @param {Object} req the request 
 * @param {Object} res the response 
 */
async function getTopics(req,res) {
    const result =await service.getTopics()
    console.log(result)
    res.send(result)
}

async function createTopics(req,res) {
    const result= await service.createTopics()
    console.log(result)
    res.send(result)
}

module.exports = {
    getTopics,
    createTopics
}
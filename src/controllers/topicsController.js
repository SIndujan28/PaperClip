const service = require('../services/topicsService')

/**
 * Get all topics
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function getTopics (req, res) {
  const result = await service.getTopics()
  console.log(result)
  res.send(result)
}
/**
 *
 * @param {Obect} req the request with parameters for createTopics
 * @param {Object} res the response
 */
async function createTopics (req, res) {
  const result = await service.createTopics([req.body])
  res.send(result)
}

module.exports = {
  getTopics,
  createTopics
}

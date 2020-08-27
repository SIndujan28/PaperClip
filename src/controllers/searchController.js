const service = require('./../services/bookService')
const _ = require('lodash')

/**
 *
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function searchBooks (req, res) {
  const result = await service.searchBooks(req.query)
  res.send(_.map(result, (item) => item._source))
}

module.exports = {
  searchBooks
}

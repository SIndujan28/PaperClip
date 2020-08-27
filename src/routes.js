module.exports = {
  '/topics': {
    get: {
      controller: 'topicsController',
      method: 'getTopics'
    },
    post: {
      controller: 'topicsController',
      method: 'createTopics'
    }
  },
  '/books': {
    get: {
      controller: 'searchController',
      method: 'searchBooks'
    }
  }
}

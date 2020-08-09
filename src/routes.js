module.exports = {
    '/topics': {
        get: {
            controller: 'topicsController',
            method: 'getTopics',
        },
    },
    '/top': {
        get: {
            controller: 'topicsController',
            method: 'createTopics'
        }
    }
}
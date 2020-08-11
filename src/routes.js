module.exports = {
    '/topics': {
        get: {
            controller: 'topicsController',
            method: 'getTopics',
        },
    },
    '/topics': {
        post: {
            controller: 'topicsController',
            method: 'createTopics'
        }
    }
}
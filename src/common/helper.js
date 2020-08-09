const errors = require('./errors')
const _ = require('lodash')
/**
 * wrap async function to standard express function
 * @param {Function} fn the async function
 * @returns {Function} the wrapped function
 */
function wrapExpress(fn) {
    return function(req,res,next) {
        fn(req,res,next).catch(next)
    }
}

/**
 * wrap all function from object
 * @param obj the object which controller exports
 * @returns {Object|Array} the wrapped object
 */
function autoWrapExpress(obj) {
    if(_.isArray(obj)) {
        console.log(obj.map((i) => i.toString()))
        obj.map(wrapExpress)
    }
    
    if(_.isFunction(obj)) {
        if(obj.constructor.name === 'AsyncFunction') {
            console.log('hi')
            return wrapExpress(obj)
        }
        return obj
    }
    _.each(obj, (value,key) => {
        obj[key] = autoWrapExpress(value)
    })
    return obj
}

module.exports = {
    wrapExpress,
    autoWrapExpress,
}
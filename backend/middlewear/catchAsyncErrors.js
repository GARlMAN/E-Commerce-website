//try catch block for async functions which uses resolve
module.exports = (theFucs) => (req, res, next) => {
    Promise.resolve(theFucs(req, res, next)).catch(next)
} 
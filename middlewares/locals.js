
async function localsMiddleware(req, res, next){
    const user = req.session.user
    const isAuthenticated = req.session.isAuthenticated
    
    if(!user || !isAuthenticated){
        return next()
    }
    res.locals.isAuthenticated = isAuthenticated
    next()
}

module.exports = localsMiddleware
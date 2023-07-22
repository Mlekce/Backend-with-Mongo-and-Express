const User = require('../models/auth-model')
async function localsMiddleware(req, res, next){
    const user = req.session.user
    const isAuthenticated = req.session.isAuthenticated
    
    if(!user || !isAuthenticated){
        return next()
    }
    const checkUser = await (new User(user.email)).findUser()
    if(checkUser.avatar){
        res.locals.avatar = checkUser.avatar
    }
    
    res.locals.isAuthenticated = isAuthenticated
    res.locals.email = user.email
    next()
}

module.exports = localsMiddleware
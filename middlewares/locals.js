const User = require('../models/auth-model')
async function localsMiddleware(req, res, next){
    const user = req.session.user
    const isAuthenticated = req.session.isAuthenticated
    
    if(!user || !isAuthenticated){
        return next()
    }
    const checkUser = await (new User(user.email)).findUser()
    console.log(checkUser)
    if(checkUser.avatar){
        res.locals.avatar = checkUser.avatar
    }
    if(checkUser.isAdmin){
        res.locals.isAdmin = checkUser.isAdmin
    }
    if(checkUser.isBanned){
        res.locals.isBanned = checkUser.isBanned
    }
    
    res.locals.isAuthenticated = isAuthenticated
    res.locals.email = user.email
    next()
}

module.exports = localsMiddleware
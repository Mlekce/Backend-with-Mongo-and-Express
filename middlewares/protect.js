function checkBan(req, res, next){
    if(res.locals.isBanned){
        return res.redirect('/banned')
    }
    next()
}

module.exports = checkBan
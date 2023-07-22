const validate = require('../util/verification')
const User = require('../models/auth-model')

function getHome(req, res){
    res.render('home')
}

function redRoot(req, res){
    res.redirect('/')
}

function getLogin(req, res){
    let savedSessionData = req.session.errorData
    if(!savedSessionData){
        savedSessionData = {
            hasError : false,
            message: "",
            email: "",
            password: ""
        }
    }
    req.session.errorData = null
    res.render('login', {errorData : savedSessionData})
}

async function getSignup(req, res){
    let savedSessionData = req.session.errorData
    if(!savedSessionData){
        savedSessionData = {
            hasError : false,
            message: "",
            email: "",
            cmail: "",
            password: ""
        }
    }
    req.session.errorData = null
    res.render('signup', {errorData : savedSessionData})
    
}

function getAdmin(req, res){
    if(!res.locals.isAuthenticated){
        return res.status(401).render('401')
    }

    res.render('admin')
}

async function postLogin(req, res){
    const userInput = req.body
    const email = userInput.email
    const password = userInput.password

    if(!validate.validateInput(email, password)){
        req.session.errorData = {
            hasError: true,
            message: "Wrong input",
            email: email,
            password: password
        }
        req.session.save(function(){
            res.redirect('/login')
        })
        return
    }

    const checker = new User(email, password)
    const user = await checker.findUser()
    if(!user){
        req.session.errorData = {
            hasError: true,
            message: "User doesn't exist",
            email: "",
            password: ""
        }
        req.session.save(function(){
            res.redirect('/login')
        })
        return
    }

    const lastCheck = await User.comparePasswords(password, user.password)
    if(!lastCheck){
        req.session.errorData = {
            hasError: true,
            message: "Wrong password",
            email: "",
            password: ""
        }
        req.session.save(function(){
            res.redirect('/login')
        })
        return
    }

    req.session.user = { email: email}
    req.session.isAuthenticated = true
    res.redirect('/admin')
}

async function postSignup(req, res){
    const email = req.body.email
    const cmail = req.body['confirm-email']
    const password = req.body.password

    if(!validate.validateInputEmail(email, cmail, password)){
        req.session.errorData = {
            hasError: true,
            message:"Wrong input data",
            email: email,
            cmail: cmail,
            password: password
        }
        req.session.save(function(){
            res.redirect('/signup')
        })
        return
    }

    const checker = new User(email, password)
    if(await checker.findUser()){
        req.session.errorData = {
            hasError: true,
            message:"user already exist",
            email: email,
            cmail: cmail,
            password: password
        }
        req.session.save(function(){
            res.redirect('/signup')
        })
        return
    }

    const newUser = new User(email, password)
    await newUser.addUser()
    res.redirect('/login')
}

function logout(req, res){
    req.session.user = null
    req.session.isAuthenticated = false
    res.redirect('/')
}

function getProfile(req, res){
    res.render('profile')
}

function postProfile(req, res){
    
}

module.exports = {
    getHome: getHome,
    getLogin: getLogin,
    getSignup: getSignup,
    getAdmin: getAdmin,
    postLogin: postLogin,
    postSignup: postSignup,
    logout: logout,
    redRoot:redRoot

}
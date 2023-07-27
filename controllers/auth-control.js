const validate = require("../util/verification");
const generateUniqueToken = require("../util/makepass");
const sendMail = require("../util/sendmail");
const User = require("../models/auth-model");
const { ObjectId } = require("mongodb");

function getHome(req, res) {
  res.render("home");
}

function redRoot(req, res) {
  res.redirect("/");
}

function getLogin(req, res) {
  let savedSessionData = req.session.errorData;
  if (!savedSessionData) {
    savedSessionData = {
      hasError: false,
      message: "",
      email: "",
      password: "",
    };
  }
  req.session.errorData = null;
  res.render("login", { errorData: savedSessionData });
}

async function getSignup(req, res) {
  let savedSessionData = req.session.errorData;
  if (!savedSessionData) {
    savedSessionData = {
      hasError: false,
      message: "",
      email: "",
      cmail: "",
      password: "",
    };
  }
  req.session.errorData = null;
  res.render("signup", { errorData: savedSessionData });
}

async function getAdmin(req, res) {
  if (!res.locals.isAuthenticated) {
    return res.status(401).render("401");
  }
  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  const all_users = await User.getAllUsers();
  res.render("admin", { users: all_users });
}

async function postLogin(req, res) {
  const userInput = req.body;
  const email = userInput.email;
  const password = userInput.password;

  if (!validate.validateInput(email, password)) {
    req.session.errorData = {
      hasError: true,
      message: "Wrong input",
      email: email,
      password: password,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  const checker = new User(email, password);
  const user = await checker.findUser();
  if (!user) {
    req.session.errorData = {
      hasError: true,
      message: "User doesn't exist",
      email: "",
      password: "",
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  const lastCheck = await User.comparePasswords(password, user.password);
  if (!lastCheck) {
    req.session.errorData = {
      hasError: true,
      message: "Wrong password",
      email: "",
      password: "",
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  req.session.user = { email: email };
  req.session.isAuthenticated = true;
  res.redirect("/posts");
}

async function postSignup(req, res) {
  const email = req.body.email;
  const cmail = req.body["confirm-email"];
  const password = req.body.password;

  if (!validate.validateInputEmail(email, cmail, password)) {
    req.session.errorData = {
      hasError: true,
      message: "Wrong input data",
      email: email,
      cmail: cmail,
      password: password,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const checker = new User(email, password);
  if (await checker.findUser()) {
    req.session.errorData = {
      hasError: true,
      message: "user already exist",
      email: email,
      cmail: cmail,
      password: password,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const newUser = new User(email, password);
  await newUser.addUser();
  res.redirect("/login");
}

function logout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}

function getProfile(req, res) {
  res.render("profile");
}

async function postProfile(req, res) {
  const avatar = req.file;
  const newUser = new User(res.locals.email, null, avatar.path);
  var result = await newUser.addProfilePicture();
  if (result) {
    return res.redirect("/");
  }
  return res.status(500).render("500");
}

async function resetPassword(req, res) {
  const email = req.body.email;
  const user = await User.findUserByEmail(email);
  if (!user) {
    req.session.errorData = {
      hasError: true,
      message: "No such user",
      email: email,
    };
    req.session.save(function () {
      res.redirect("/reset");
    });
    return;
  }
  let token = await generateUniqueToken();
  await User.addToken(user._id, token);
  let text = `
    Hello user, if you are seing this page that means that you or someone tried to reset your password.
    If you dodn't do this, then ignore this mail. Otherwise, follow this link below to reset password.
    http://localhost:3000/reset-password?token=${token}
    `;
  let subject = "Reset password";
  sendMail({ email: email, subject: subject, text: text });
  res.redirect("/reset");
}

function resetPage(req, res) {
  let savedSessionData = req.session.errorData;
  if (!savedSessionData) {
    savedSessionData = {
      hasError: false,
      message: "",
      email: "",
      cmail: "",
      password: "",
    };
  }
  req.session.errorData = null;
  res.render("reset", { errorData: savedSessionData });
}


async function postResetPasswordPage(req, res){
  const token = req.body.token
  const passwd = req.body.password
  const cpasswd = req.body.cpassword
  if(passwd && cpasswd && passwd === cpasswd){
    let encPassword = await User.encryptPassword(passwd)
    const user = await User.findToken(token)
    if(!user.token){
      return res.status(404).redirect('/404')
    }
    const id = new ObjectId(user._id)
    await User.setNewPassword(id, encPassword)
    return res.redirect('/login')
  }
  res.redirect('/500')

}

async function getResetPasswordPage(req, res){
    const token = req.query.token
    const user = await User.findToken(token)
    const nowTime = new Date().getTime()
    if(!user.token){
      return res.status(404).redirect('/404')
    }
    if(nowTime - user.tokenDate >= 600000){
      console.log("token expired")
      return res.redirect('/reset')
    }
    res.render('newpassword', {token:token})
}

module.exports = {
  getHome: getHome,
  getLogin: getLogin,
  getSignup: getSignup,
  getAdmin: getAdmin,
  postLogin: postLogin,
  postSignup: postSignup,
  logout: logout,
  redRoot: redRoot,
  getProfile: getProfile,
  postProfile: postProfile,
  resetPage: resetPage,
  resetPassword: resetPassword,
  getResetPasswordPage: getResetPasswordPage,
  postResetPasswordPage:postResetPasswordPage
};

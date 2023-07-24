const User = require("../models/auth-model");
const validation = require("../util/verification");
const mongodb = require("mongodb");
var ObjectId = mongodb.ObjectId;

async function addUsers(req, res) {
  var email = req.body.email;
  var cmail = req.body.cmail;
  var password = req.body.password;

  var checkRes = validation.validateInput(email, cmail, password);
  if (!checkRes) {
    console.log("Wrong input");
    return res.status(401).render("401");
  }

  var new_user = new User(email, password);
  if (await new_user.findUser()) {
    console.log("User already exist");
    return res.status(500).render("500");
  }

  await new_user.addUser();
  res.status(202).redirect("/admin");
}

async function Ban(req, res) {
  const userId = new ObjectId(req.params.id);
  const checkUserExist = await User.findUserById(userId);

  if (!checkUserExist) {
    return res.status(404).render("404");
  }
  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }
  if (checkUserExist.isBanned) {
    checkUserExist.isBanned = false;
  } else {
    checkUserExist.isBanned = true;
  }

  await User.banUser(checkUserExist._id, checkUserExist.isBanned);

  return res.redirect("/admin");
}

/*
async function resetPassword(req, res){
    const userId = new ObjectId(req.params.id) 
    const checkUserExist = await User.findUserById(userId)
    if(!checkUserExist){
        return res.status(404).render('404')
    }
    if(!res.locals.isAdmin){
        return res.status(403).render('403')
    }
    await User.encryptPassword("1234567")
    res.redirect("/admin")
}
*/
module.exports = {
  addUsers: addUsers,
  Ban: Ban,
};

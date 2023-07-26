const db = require("../data/database");
const bcrypt = require("bcrypt");

class User {
  constructor(email, password, avatar) {
    this.email = email;
    this.password = password;
    this.avatar = avatar;
  }

  async addUser() {
    const encPassword = await bcrypt.hash(this.password, 12);
    const newUser = {
      email: this.email,
      password: encPassword,
      avatar: "pictures/nopicture.png",
    };
    await db.getDb().collection("users").insertOne(newUser);
  }

  async findUser() {
    const checkUserExist = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });
    return checkUserExist;
  }

  static async findUserByEmail(email) {
    const checkUserExist = await db
      .getDb()
      .collection("users")
      .findOne({ email: email });
    return checkUserExist;
  }

  static async findUserById(id) {
    const checkUserExist = await db
      .getDb()
      .collection("users")
      .findOne({ _id: id });
    return checkUserExist;
  }

  static async banUser(id, status) {
    return await db
      .getDb()
      .collection("users")
      .updateOne({ _id: id }, { $set: { isBanned: status } });
  }

  async deleteUser() {
    return await db
      .getDb()
      .collection("users")
      .deleteOne({ email: this.email });
  }

  static async comparePasswords(passwd1, passwd2) {
    return await bcrypt.compare(passwd1, passwd2);
  }

  static async getAllUsers() {
    return await db.getDb().collection("users").find().toArray();
  }

  async addProfilePicture() {
    if (!this.avatar) {
      return;
    }
    return await db
      .getDb()
      .collection("users")
      .updateOne({ email: this.email }, { $set: { avatar: this.avatar } });
  }

  static async encryptPassword(passwd) {
    return await bcrypt.hash(passwd, 12);
  }

  static async addAdminRights(id, rights){
    return await db.getDb().collection('users').updateOne({ _id :  id}, {$set : {isAdmin: rights}})
  }

  static async addToken(id, token){
    return await db.getDb().collection('users').updateOne({ _id :  id}, {$set : {token: token, tokenDate: new Date().getTime()}})
  }

  static async findToken(token){
    return await db.getDb().collection('users').findOne({token: token})
  }
}

module.exports = User;

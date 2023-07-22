const db = require('../data/database')
const bcrypt = require('bcrypt')

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async addUser(){
    const encPassword = await bcrypt.hash(this.password, 12)
    const newUser = { email: this.email, password: encPassword }
    await db.getDb().collection('users').insertOne(newUser)
  }

  async findUser(){
    const checkUserExist = await db.getDb().collection('users').findOne({email:this.email})
    return checkUserExist

  }

  async deleteUser(){
    return await db.getDb().collection('users').deleteOne({email:this.email})
  }

  static async comparePasswords(passwd1, passwd2 ){
    return await bcrypt.compare(passwd1, passwd2)
  }

}


module.exports = User
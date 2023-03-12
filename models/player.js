const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const playerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    age : {
       type : Number,
       required : true
    },
    country : {
        type : String
    },
    installed_days: Number, 
    coins : Number, 
    gems : Number, 
    game_level : Number, 
    purchaser : String

})

playerSchema.statics.signup = async function (email,password,name, age) {
    if(!email || !password || !name || !age){
      throw Error('All fields are mandatory')
    }
    if(!validator.isEmail(email)){
      throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
      throw Error('Password is not strong enough')
    }

 const exists = await this.findOne({email}) 
 if(exists){
  throw Error("Email already in Use")
 }

 const salt = await bcrypt.genSalt(10)
 const hash = await bcrypt.hash(password, salt)
 const user = await this.create({email, password : hash})
 
 return user
}


playerSchema.statics.signin = async function (email, password, name, age){
    if(!email || !password || !name || !age){
      throw Error('All fields are mandatory')
    }
    const user = await this.findOne({email})
    if(!user){
     throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
      throw Error ("Incorrect Password")
    }
  
    return user
  }

module.exports = mongoose.model("Player",playerSchema )
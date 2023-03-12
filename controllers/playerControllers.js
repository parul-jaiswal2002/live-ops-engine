const User = require('../models/player')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {   
   return jwt.sign({_id } , process.env.SECRET, {expiresIn : '3d'}) 
}


const signinUser = async (req,res) => {
    const {email, password,name, age} = req.body
    try {
        const user = await User.signin(email,password,name, age)
        const token = createToken(user._id)
        res.status(200).json({email, token}) 
     }
     catch(error){
        res.status(400).json({error  : error.message})
     }
    
}

const signUpUser = async (req, res) => {
    const {email, password ,name, age} = req.body;

    try {
       const user = await User.signup(email,password,name, age)

       const token = createToken(user._id)
       res.status(200).json({email, token}) 
    }
    catch(error){
       res.status(400).json({error  : error.message})
    }
}

module.exports = {
    signinUser,
    signUpUser
}


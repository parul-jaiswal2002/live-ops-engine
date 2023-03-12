const express = require('express')
const { signinUser, signUpUser } = require('../controllers/playerControllers');

const router = express.Router();

router.post('/signin', signinUser)

router.post('/signUp', signUpUser)


module.exports = router
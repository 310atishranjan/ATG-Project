const express=require('express');
const { RegisterController, loginController, emailSend, changePassword } = require('../controller/userController');

const router=express.Router();

router.post('/register',RegisterController)
router.post('/login',loginController);

router.post('/emailsend',emailSend);
router.post('/change-password',changePassword);
module.exports=router
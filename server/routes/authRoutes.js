const express = require('express'); 
const router = express.Router();
const authController=require('./../controllers/authControllers')
const errorHandler = require('./../middelwares/errorHandler');
const multerSetup=require('./../utils/multerSetup')
router.post('/register',authController.register); 

router.post('/login',authController.login);
module.exports = router;
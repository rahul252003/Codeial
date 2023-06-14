
const express = require('express');
const router = express.Router();


//console.log(passport)
const homeController=require('../controllers/home_controller')
console.log("Router loaded");
router.get('/',homeController.home);

router.use('/users',require('./users'));
module.exports=router;


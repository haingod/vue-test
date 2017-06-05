var express = require('express');
var router = express.Router();
var userController = require("../controller/userController")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register',function (req,res,next) {
    res.render('register', { title: 'Register' })
})

router.post('/register',function(req, res, next) {
    userController.register(req,res,next)
})

router.post('/login',function(req,res,next) {
        userController.login(req, res,next)
},function (req, res, next) {
    res.redirect('/')
});

router.get('/logout',function (req,res) {
    userController.logout(req,res)
})

module.exports = router;

var express = require('express');
var router = express.Router();
var productmodel = require('../models/product');
var userController = require("../controller/userController")
var productController = require("../controller/productController")
var multer  = require('multer')
var upload = multer({ dest: './public/images' })

var auth = function(req, res, next) {
    if (req.user)
        return next();
    else
        return res.sendStatus(401);
};



/* GET users listing. */
router.get('/list', function(req, res, next) {
    res.send([
        {'name':'son'},
        {'name':'son'},
        {'name':'son'},
    ])

});


/* GET users listing. */
router.get('/products', function(req, res, next) {
    productmodel.getProducts()
    .then((data)=>{
        return res.send(data)
    },err=>{
        return res.send(err)
    });

});

router.post('/addproduct',auth,function(req, res, next) {

        productController.addProduct(req,res,next).then(function (data) {
            res.send(data)
        })
});
router.put('/editproduct', function(req, res, next) {
    productController.editProduct(req,res,next).then(function (data) {
        res.send(data)
    },function(err){
        res.header(404).send(err)
    })
});
router.delete('/deleteproduct/:id',auth, function(req, res, next) {

        productmodel.findById(req.params.id, function (err, doc) {
            if (err) {
                console.log(err);
                throw err;
            }
            productmodel.remove({_id: req.params.id}, function (er, message) {
                if (er) return res.status(500).json(er);
                productmodel.getProducts().then(function (data) {
                    res.send(data)
                })
            })
        })


});


router.post('/login',function(req,res,next) {
    userController.login(req, res,next)
},function (req, res, next) {
    res.redirect('/')
});


module.exports = router;

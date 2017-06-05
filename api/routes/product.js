var express = require('express');
var router = express.Router();
var jQuery = require('jquery')
var productController = require('../controller/productController')
/* GET users listing. */
router.get('/getlist', function(req, res, next) {
    res.render('viewlist');
});

router.get('/addproduct',function(req,res,next){
    res.render('addproduct');
})
router.post('/addproduct',function(req,res,next){
    if(req.user)
        productController.addProduct(req,res,next)
    else{
        req.flash('Failed', 'You must login to use this feature');
        res.redirect('/product/getlist')
    }
})
router.post('/editproduct',function(req,res,next){
    if(req.user)
        productController.editProduct(req,res,next)
    else{
        req.flash('Failed', 'You must login to use this feature');
        res.redirect('/product/getlist')
    }
})

module.exports = router;

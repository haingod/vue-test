var Product = require('../models/product');
module.exports.addProduct = function(req,res,next){
    var name = req.body.name;
    var type = req.body.type;
    var manufacturer = req.body.manufacturer;

//check for image field
    var image = req.files[0];
    if(image){
        console.log('Uploading file...');

        var ImageOriginalName = image.originalname;
        var ImageName = image.filename;
        var ImageMime = image.mimetype;
        var ImagePath = image.path;
        var ImageExt = image.extension;
        var ImageSize = image.size;


    }
    else{
        var ImageName = "noimage.png";
    }

    //form validation
    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('type','Type field is required').notEmpty();
    req.checkBody('manufacturer','Manufacturer not valid').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.render('addproduct',{
            errors:errors,
            name:name,
            type:type,
            manufacturer:manufacturer,
            image:ImageName
        })
    }else{
        var newProduct = new Product({
            name:name,
            type:type,
            manufacturer:manufacturer,
            image:ImageName
        });
         // add input to DB
        Product.create(newProduct,function(err,products){
            if(err) throw err;
        })

        //Success Message
        res.location('/product/getlist');
        res.redirect('/product/getlist');
    }

}
module.exports.editProduct = function(req,res,next){

    console.log("SERVER:",req.body.formData.get('name'))
    if(!req.body.id)
        return res.status(500).send("ID is required");
    else
    {
        var name = req.body.formData.name;
        var type = req.body.type;
        var manufacturer = req.body.manufacturer;

//check for image field
        var image = req.files[0];
        if(image){
            console.log('Uploading file...');

            var ImageOriginalName = image.originalname;
            var ImageName = image.filename;
            var ImageMime = image.mimetype;
            var ImagePath = image.path;
            var ImageExt = image.extension;
            var ImageSize = image.size;


        }
        else{
            var ImageName = req.body.defaultimage;
        }

        //form validation
        req.checkBody('name','Name field is required').notEmpty();
        req.checkBody('type','Type field is required').notEmpty();
        req.checkBody('manufacturer','Manufacturer not valid').notEmpty();

        var errors = req.validationErrors();
        if(!errors){
            var newProduct = {
                name:name,
                type:type,
                manufacturer:manufacturer,
                image:ImageName
            };


            return new Promise(function (resolve,reject) {
                Product.update({_id:req.body.id},newProduct,function(err,todo){
                    if(err || 1) return reject({status:0});
                    return resolve({status:1})
                })
            })

        }
    }
}
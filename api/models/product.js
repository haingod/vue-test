var mongoose = require('mongoose');

var schema = mongoose.Schema;

var product = new schema({
    name:String,
    type:String,
    manufacturer:String,
    image:String
});

var productmodel = mongoose.model("products",product);

module.exports = productmodel;

module.exports.getProducts = function() {
    return new Promise(function(success,fail){
        productmodel.find(function(err,data){
            if(err) return fail(err);
            return success(data);
        })
    })
}

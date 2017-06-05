var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt');



passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});

passport.use(new LocalStrategy(
    function (username,password,done) {

        User.findOne({
            username : username
        }).then(function (user,err) {

            if(user){
                bcrypt.compare(password, user.password, function (err,result) {
                    if (err) { return done(err); }
                    if(!result) {
                        return done(null, false, { message: 'Incorrect username and password' });
                    }

                    return done(null, user);
                })
            }else{
                return done(null, false, { message: 'Incorrect username and password' });
            }



        }).catch(function (err) {
            return done(err);
        })
    }
))
module.exports.register = function(req,res,next){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;


//check for image field
    var profileimage = req.files[0];
    if(profileimage){
        console.log('Uploading file...');

        var profileImageOriginalName = profileimage.originalname;
        var profileImageName = profileimage.filename;
        var profileImageMime = profileimage.mimetype;
        var profileImagePath = profileimage.path;
        var profileImageExt = profileimage.extension;
        var profileImageSize = profileimage.size;


    }
    else{
        var profileImageName = "noimage.png";
    }

    //form validation
    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('email','email field is required').notEmpty();
    req.checkBody('email','email not valid').isEmail();
    req.checkBody('username','email field is required').notEmpty();
    req.checkBody('password','password field is required').notEmpty();
    req.checkBody('password2','password do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors:errors,
            name:name,
            email:email,
            username:username,
            password:password,
            password2: password2
        })
    }else{
        var newUser = new User({

            name:name,
            email:email,
            username:username,
            password:password,
            password2: password2,
            profileimage: profileImageName
        });

        //Create user
        User.createUser(newUser,function(err,user){
            if(err) throw err;
            console.log(user);
        })
        //Success Message
        req.flash('success','You are now registered and may log in');
        res.location('/');
        res.redirect('/');
    }

}
module.exports.login =  function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {

        if (err) { return res.json(err); }

        console.log(user);
        if(user){

            console.log(123123123123123);
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                console.log('da login');
                return res.json({error:0,message:'login successfully 1',user:user});
            });

        }else{
            return res.status(400).json({error:1,message:'tài khoản hoặc mật khẩu không đúng'});
        }


    })(req, res, next);
}
module.exports.logout = function(req,res){
    req.logout();
    //req.flash('success','You have logged out')
    res.redirect('/')
}
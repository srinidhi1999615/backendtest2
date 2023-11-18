const passport = require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../model/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Attempt to find a user and establish their identity
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport', err);
        return done(err);
    }
}));


//Serialize the user 
passport.serializeUser(function(user,done){
    done(null,user.id)
});

//Deserialize the user
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false); // User not found
        }
        return done(null, user);
    } catch (err) {
        console.log('An unexpected error occurred during deserialization -> Passport', err);
        return done(err);
    }
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/signin');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}
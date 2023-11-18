const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../model/user');

passport.use(new GoogleStrategy({
    clientID: "765557687692-uo7i30vu06umv1act8gjq4idv6j4upqq.apps.googleusercontent.com",
    clientSecret: process.env.googleSecret,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find a user
        let user = await User.findOne({ email: profile.emails[0].value }).exec();

        if (user) {
            // If found, set this user as req.user
            return done(null, user);
        } else {
            // If not found, create the user and set it as req.user
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });

            return done(null, user);
        }
    } catch (err) {
        console.error('Error in Google Strategy passport', err);
        return done(err, null);
    }
}));

module.exports = passport;

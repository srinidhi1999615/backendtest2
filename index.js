require('dotenv').config();

const express = require('express');
const app = express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo')(session);



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// use express router
//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//Using mongostore to store the session data in mongodb
const mongoStore = new MongoStore({
    mongooseConnection: db,
    autoRemove: 'disabled'
}, function (err) {
    console.log(err || 'Connect mongo setup ok');
});

app.use(session({
    name: 'srinidhicodeial',
    secret:process.env.sessionSecret ,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: mongoStore // Use the mongoStore instance here
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//routes
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

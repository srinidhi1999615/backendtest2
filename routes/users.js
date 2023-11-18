const express = require('express');
const router = express.Router();
const passport=require('passport');

const usersController = require('../controllers/users_controller');

router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.get('/signup',usersController.signup);
router.get('/signin',usersController.signin);
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),usersController.createSession);
router.get('/signout',usersController.destroySession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),usersController.createSession);

module.exports = router;
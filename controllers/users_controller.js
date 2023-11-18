const User = require('../model/user');
const bcrypt = require('bcryptjs');
module.exports.profile = async function (req, res) {
  try {
    const userId = req.params.id;

    if (!userId) {
      console.error('User ID is undefined');
      return res.status(400).send('User ID is missing');
    }

    console.log('Looking for user with ID:', userId);

    const user = await User.findById(userId).exec();

    if (!user) {
      console.error('User not found');
      return res.status(404).send('User not found');
    }

    console.log('Found user:', user);

    return res.render('users_profile', {
      title: 'User Profile',
      profile_user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};




module.exports.update = async function(req, res) {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user contains the authenticated user

    // Check if the user exists
    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log('Request Body:', req.body); // Debugging: Log the request body to check 'password' value

    const newPassword = req.body.password;

    if (!newPassword) {
      return res.status(400).send('New password is missing');
    }
    
   user.password=newPassword;
    await user.save(); // Save the updated user
    console.log('Password updated successfully');
    return res.redirect('/users/signin');
  } catch(err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};


module.exports.signup=function(req,res){
 
    return res.render('users_sign_up',{
        title:"User sign up"
    })
}
module.exports.signin=function(req,res){
  
    return res.render('users_sign_in',{
        title:"User sign in"
    })
}
module.exports.create = async function (req, res) {
    try {
      if (req.body.password !== req.body.confirmPassword) {
        return res.redirect('back');
      }
  
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (!existingUser) {
        const newUser = await User.create(req.body);
        return res.redirect('/users/signin');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.error('Error in creating or finding the user in signup:', err);
      return res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports.createSession = function(req, res){
    return res.redirect('/');
}
module.exports.destroySession = function(req, res) {
  req.logout(function(err) {
    if (err) {
      // Handle any errors that occur during logout, if necessary
      console.error(err);
    }
    
    return res.redirect('/');
  });
}


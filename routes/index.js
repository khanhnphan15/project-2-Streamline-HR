var express = require('express');
var router = express.Router();
const passport = require('passport')
// This app has no "home" page, but your projects should 😀
router.get('/', function(req, res, next) {
  res.redirect('/movies');
});

// this is the route we make a get request to from the client, to start log in process get request /auth/google
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    // opitionally force pick account each time add the key value pair
    // prompt: 'select_account'
  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/movies', // what route do you want to redirect if the login was success
    failureRedirect: '/movies' // what route do you want to redirect to if the login failed, its your choice!
  }
))


// start the logout from client make a get request to /logout
router.get('/logout', function(req, res){
  req.logout(function(){ // req.logout is from passport, and when we call it we destroy the session cookie and make a brand new one, 
    // so the user has to login again
    res.redirect('/movies')
  })
})

module.exports = router;

// File where we can configure our passport strategies (login in with google, login with facebook, etc.... are all strategies)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const UserModel = require('../models/user');


// this function middleware will be called everytime a USER LOG's in
passport.use(
	new GoogleStrategy(
	  // Configuration object, we need to tell google its our app!
	  {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK
	  },
	  // The verify callback function (Gets called everytime a user logs in!)
	 async function(accessToken, refreshToken, profile, cb) {  //< - information we want is in the profile object
		// a user has logged in with OAuth...

		// cb (callback) function signature, cb(error, SuccessfulDataYouWantToPassAlong) in our case successful data will the be users document from mongodb
        try {
			// if the user has logged in before, we want to make sure that we pass the users information along in our middlware chain
			let userDocument = await UserModel.findOne({googleId: profile.id});
			// if no user is found, the let user, would be undefined otherwise its the users document from mongodb
			
			// so if we found the user, pass thier information to the next function in the middleware chain
			if(userDocument) return cb(null, userDocument);
		    // if its the users first time loggin in, we need to create a user document and store them in our database, and then pass the user information
		    // along in our middleware chain
			
		    // first time logging in! Create the user!
			userDocument = await UserModel.create({
				name: profile.displayName,
				googleId: profile.id,
				email: profile.emails[0].value,
				avatar: profile.photos[0].value
			})

			return cb(null, userDocument)
			
		} catch(err){
			return cb(err)
		}


	  }
	)
  );
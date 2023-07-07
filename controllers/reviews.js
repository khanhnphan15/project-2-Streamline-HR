
// Import our movie model in order to talk to the movies collection in mongodb
const MovieModel = require('../models/movie');

module.exports = {
	create,
	delete: deleteReview
}




async function deleteReview(req, res, next){


	
	try {
			// Find the movie with the review, 
		const movieDoc = await MovieModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});

		// A rogue User, a user thats not logged in
		if(!movieDoc) return res.redirect('/movies')

		// then remove the review from the movies movie.reviews array (.remove is from mongoose doc methods)
		movieDoc.reviews.remove(req.params.id); // remove takes the id of the subdoc (review)	
		// we mutated the movieDoc reviews array so we need to tell mongodb to update the databsase
		await movieDoc.save();

		res.redirect(`/movies/${movieDoc._id}`); // tells th client to make a request to this route


	} catch(err){
		next(err)
	}


}

async function create(req, res){

	// Take the contents of the form and create a review

	// 1. Find the movie we want to add the review too.
	    // What information do we have the identifys the movie? req.params.id 
	  //2. Talk to the database to go find that movie, 
		//   What talks to the Movies in the database? MovieModel
		// What method on the movieModel can find something by an id? findById
	  // What variable is the Contents of the form? req.body <- represent a Review
	console.log(req.body)
	try {

		const movieFromTheDb = await MovieModel.findById(req.params.id)
		// I could check my code make sure I'm finding the movie
		
		// Add the logged in user properties to req.body!
		req.body.user = req.user._id
		req.body.userName = req.user.name;
		req.body.userAvatar = req.user.avatar;
		


		// add the review (req.body) to the movie (movieFromTheDb) we found from the db
		movieFromTheDb.reviews.push(req.body);
		// since I changed a document (movieFromTheDb) (I mutated it)
		// I have to tell mongodb that, so we have to save
		await movieFromTheDb.save();
		// Then respond to the client!
		console.log(movieFromTheDb)
		// what do you have access too that has the movie id?
		res.redirect(`/movies/${req.params.id}`)

	} catch(err){
		res.send(err)
	}
		



}
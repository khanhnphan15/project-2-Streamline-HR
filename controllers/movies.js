const MovieModel = require('../models/movie');

module.exports = {
  index,
  show,
  new: newMovie,
  create
};

async function index(req, res) {
  const movies = await MovieModel.find({});
  res.render('movies/index', { title: 'All Movies', movies });





  // MovieModel.find({}, function(err, movies){
  //   res.render('movies/index', { title: 'All Movies', movies });
  // })

 
}

async function show(req, res) {
  const movie = await MovieModel.findById(req.params.id);
  res.render('movies/show', { title: 'Movie Detail', movie });
}

function newMovie(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('movies/new', { title: 'Add Movie', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove any whitespace at start and end of cast
  req.body.cast = req.body.cast.trim();
  // split cast into an array if it's not an empty string - using a regular expression as a separator
  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {


    const movieFromTheDatabase =  await MovieModel.create(req.body);// the await is waiting for the MovieModel to go to MongoDB ATLAS (our db) a
    //and put the contents form in the db, and come to the express server

    // if you want to see what you put in the database on your server
    console.log(movieFromTheDatabase)

    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect('/movies');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('movies/new', { errorMsg: err.message });
  }
}
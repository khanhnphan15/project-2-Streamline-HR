const MovieModel = require("../models/movie");
const PerformerModel = require("../models/performer");

module.exports = {
  index,
  show,
  new: newMovie,
  create,
};

async function index(req, res) {
  const movies = await MovieModel.find({});
  console.log(movies);
  res.render("movies/index", { title: "All Movies", movies: movies });

  // MovieModel.find({}, function(err, movies){
  //   res.render('movies/index', { title: 'All Movies', movies });
  // })
}

async function show(req, res) {
  try {
    const movieFromTheDatabase = await MovieModel.findById(req.params.id);

    console.log(movieFromTheDatabase);

    // Find all of the Performers that our not in the movieFromTheDatabase.cast array
    // {$nin: movieFromTheDatabase.cast} find all the performers NOT IN the movieFromTheDatabase.cast array
    // Mongoose/mongodb query

    // These are the performers for the drop down menu
    const performersFromTheDatabase = await PerformerModel.find({
      _id: { $nin: movieFromTheDatabase.cast },
    });

    res.render("movies/show", {
      title: "Movie Detail",
      movie: movieFromTheDatabase,
      performers: performersFromTheDatabase
    });
  } catch (err) {
    res.send(err);
  }
}

function newMovie(req, res) {
  // We'll want to be able to render an
  // errorMsg if the create action fails
  res.render("movies/new", { title: "Add Movie", errorMsg: "" });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove any whitespace at start and end of cast
  req.body.cast = req.body.cast.trim();

  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    const movieFromTheDatabase = await MovieModel.create(req.body); // the await is waiting for the MovieModel to go to MongoDB ATLAS (our db) a
    //and put the contents form in the db, and come back to the express server

    // if you want to see what you put in the database on your server
    console.log(movieFromTheDatabase);

    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect(`/movies/${movieFromTheDatabase._id}`); // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("movies/new", { errorMsg: err.message });
  }
}

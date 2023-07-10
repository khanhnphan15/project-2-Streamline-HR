const EmployeeModel = require("../models/employee");

module.exports = {
  index,
  // show:showEmployee,
  // create:createEmployee,
  new: newEmployee,
};

async function index(req, res) {
  // const employees = await EmployeeModel.find({});
  const employees = [{}, {}, {}, {}, {}, {}, {}, {}];
  res.render("employees/index", { title: "All Employees", employees: employees });
  // EmployeeModel.find({}, function(err, employees){
  //   res.render('employees/index', { title: 'All Employees', employees: employees });
  // })
}

function newEmployee (req, res) {
  res.render('employees/new', { title: 'Create New Employee' })
}
//
// async function show(req, res) {
//   console.log(req.user)
//
//   try {
//
//     // find the movie and populate the performer documents in the movies.cast array
//     // that way we have the whole object instead of just id's
//     const movieFromTheDatabase = await EmployeeModel
//         .findById(req.params.id)
//         .populate('cast') //  'cast' is the property name on the movie schema that has ref: 'Performer'
//         .exec();
//
//
//     console.log(movieFromTheDatabase);

    // Find all of the Performers that our not in the movieFromTheDatabase.cast array
    // {$nin: movieFromTheDatabase.cast} find all the performers NOT IN the movieFromTheDatabase.cast array
    // Mongoose/mongodb query

    // These are the performers for the drop down menu
//     const performersFromTheDatabase = await PerformerModel.find({
//       _id: { $nin: movieFromTheDatabase.cast },
//     });
//
//     res.render("movies/show", {
//       movie: movieFromTheDatabase,
//       performers: performersFromTheDatabase
//     });
//   } catch (err) {
//     res.send(err);
//   }
// }

function newEmployee (req, res) {
  // We'll want to be able to render an
  // errorMsg if the create action fails
  res.render("employees/new", { title: "Add Employee", errorMsg: "" });
}


// async function create(req, res) {
//   // convert nowShowing's checkbox of nothing or "on" to boolean
//   req.body.nowShowing = !!req.body.nowShowing;
//   // remove any whitespace at start and end of cast
//
//
//   // Remove empty properties so that defaults will be applied
//   for (let key in req.body) {
//     if (req.body[key] === "") delete req.body[key];
//   }
//   try {
//     const movieFromTheDatabase = await MovieModel.create(req.body); // the await is waiting for the MovieModel to go to MongoDB ATLAS (our db) a
//     //and put the contents form in the db, and come back to the express server
//
//     // if you want to see what you put in the database on your server
//     console.log(movieFromTheDatabase);
//
//     // Always redirect after CUDing data
//     // We'll refactor to redirect to the movies index after we implement it
//     res.redirect(`/movies/${movieFromTheDatabase._id}`); // Update this line
//   } catch (err) {
//     // Typically some sort of validation error
//     console.log(err);
//     res.render("movies/new", { errorMsg: err.message });
//   }
//}



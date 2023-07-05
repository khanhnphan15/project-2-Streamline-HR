const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// ONE MOVIE HAS MANY REVIEWS 
// A REVIEW BELONGS TO A MOVIE
// is the relationship for the reviews and movies

// if your embedding, you always
// write the many (side) schema (reviews) 
// in the One side (in this case movie)
const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, {
  timestamps: true
});




// ONE MOVIE

// SCHEMA Defines what structure/shape 
// that the documents created from the Movie Model
// that our stored in the database should look like
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1927
  },
  // This creates a one (Movie) has many (Reviews) relationship
  reviews: [reviewSchema],
  mpaaRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  nowShowing: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Movie', movieSchema);
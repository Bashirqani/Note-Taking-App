const mongoose = require('mongoose');

// Note Schema definition
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true, 
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [5, 'Description must be at least 5 characters long'],
    maxlength: [500, 'Description must be less than 500 characters'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Store user ID
    ref: 'User', // Reference the User model
    required: true, // Make sure every note belongs to a user
  },
}, { timestamps: true });

// Create a Mongoose model for the Note schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;


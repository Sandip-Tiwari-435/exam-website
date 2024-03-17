const mongoose = require("mongoose");

// Define schema for the "questions" collection
const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  image: { type: String },
  options: [ String ],
});

// Compile the "Question" model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

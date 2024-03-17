const mongoose = require("mongoose");

// Define schema for the "questions" collection
const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  options: [ String ],
  image: Buffer, // Assuming you're storing image data as a buffer
});

// Compile the "Question" model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

const mongoose = require("mongoose");

// Define schema for the "exams" collection
const examSchema = new mongoose.Schema({
  title: { type: String },
  questions: [ {category:{type:String},question:{type:String},options:[String],image:{type:String}} ],
});

// Compile the "Exam" model
const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;

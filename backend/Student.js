const mongoose = require("mongoose");

// Define schema for the "exams" collection
const studentSchema = new mongoose.Schema({
  roll: { type: String, required:true },
  eId: {type:String, required:true},
  eName: {type:String},
  sols: [ {qId:{type:String},sol:{type:String}} ],
},{
    timestamps:true
});

// Compile the "Exam" model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

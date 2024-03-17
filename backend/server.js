// server.js
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const examSchema = require('./Exam')
const questionSchema = require('./Question')

app.use(express.json()); // Connect to MongoDB
app.use(express.urlencoded());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);


mongoose.connect(
  "mongodb+srv://sandipt335:YrtyDz3QxPj85ZnA@cluster0.9h9mkzl.mongodb.net/questions?retryWrites=true&w=majority&appName=Cluster0",
  {}
);
const db = mongoose.connection;

// Check MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define Exam schema
// const examSchema = new mongoose.Schema({
//   title: String,
//   questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
// });
// const Exam = mongoose.model("Exam", examSchema);

// Define Question schema
// const questionSchema = new mongoose.Schema({
//   category: String,
//   question: String,
//   options: [String],
//   image: Buffer,
// });
// const Question = mongoose.model("Question", questionSchema);

// API endpoint to store exam data
app.post("/api/exams", async (req, res) => {
  try {
    // Create exam
    console.log(req.body);
    const exam = await examSchema.create(req.body);
    console.log(exam);
    res.status(201).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// API endpoint to retrieve exam data
app.get("/api/exams/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("questions");
    res.json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

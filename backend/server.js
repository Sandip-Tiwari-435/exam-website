// server.js
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const examSchema = require('./Exam')
const studentSchema = require('./Student')
const questionSchema = require('./Question')
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }))

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

const getReports = async (filters) => {
  // Constructing the base query
  let query = {};

  // Add filters if they are not empty
  if (filters.eName) {
    query.eName = filters.eName;
  }
  if (filters.roll) {
    query.roll = filters.roll;
  }
  if (filters.created_at) {
    // Assuming created_at is a Date object
    const startOfDay = new Date(filters.created_at);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(filters.created_at);
    endOfDay.setHours(23, 59, 59, 999);

    query.createdAt = {
      $gte: startOfDay,
      $lte: endOfDay
    };
  }

  // Fetch reports based on the constructed query
  try {
    console.log(req.body);
  
    const ok = await examSchema.aggregate([
        {
          $lookup: {
            from: "students",
            localField: "title",
            foreignField: "eName",
            as: "result"
          }
        },
    ]).find(query).exec();

    return ok;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};


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
    const exam = await examSchema.findById(req.params.id).populate("questions");
    res.json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/api/exams", async (req, res) => {
  try {
    const exam = await examSchema.find();
    console.log(exam);
    res.json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.delete("/api/exams/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const ObjectId = require('mongodb').ObjectId;
    const resi=examSchema.deleteOne({ "_id": new ObjectId(req.params.id) });
    console.log((await resi).acknowledged);
    res.json("Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/student/submit", async (req, res) => {
  try {

    
    console.log(req.body)
    const studentData = await studentSchema.create(req.body);
    console.log(studentData);
    res.status(201).json(studentData);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/report", async (req, res) => {

  getReports(req.body)
  .then(reports => {
    console.log("Reports:", reports);
  })
  .catch(error => {
    res.status(500).json({ error: "Server error" });
    console.error("Error:", error);
  });
  
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// pages/exams/create.js
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/CreateExam.module.css";
import stylesqc from "../../styles/QuestionCard.module.css";
import stylesqf from "../../styles/QuestionForm.module.css";
import QuestionForm from "../../components/QuestionForm"; // Import the QuestionForm component
import QuestionCard from "../../components/QuestionCard";
import PageLayout from "../../components/PageLayout";

export default function CreateExam() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);

  // Function to handle category selection
  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  // Function to add a new question to the list of questions
  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const submitExam = async () => {
    try {
      console.log(JSON.stringify({ questions }));
      const response = await axios.post("http://localhost:3001/api/exams", {
        title: "exam",
        questions: questions,
      },{headers:{"Content-Type" : "application/json"}});
      console.log(response.data); // Log response from the server
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1>Create New Exam</h1>
        <div className={styles.categorySelection}>
          <h2>Choose Question Category:</h2>
          {/* Add onClick handlers for category selection */}
          <button onClick={() => handleCategorySelection("mcq")}>
            Multiple Choice
          </button>
          <button onClick={() => handleCategorySelection("trueFalse")}>
            True or False
          </button>
          <button onClick={() => handleCategorySelection("imageIdentification")}>
            Image Identification
          </button>
        </div>
        {/* Render question form based on selected category */}
        {category && (
          <div className={stylesqf.questionForm}>
            {/* Pass the category as prop to QuestionForm component */}
            <QuestionForm category={category} onAddQuestion={handleAddQuestion} />
          </div>
        )}
        <div className={stylesqc.questionList}>
          {questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </div>
        {/* Submit button */}
        <button onClick={() => submitExam()} className={styles.submitButton}>
          Submit Exam
        </button>
      </div>
    </PageLayout>
  );
}

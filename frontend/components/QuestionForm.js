// components/QuestionForm.js
import React, { useState } from "react";
import styles from "../styles/QuestionForm.module.css";

export default function QuestionForm({ category, onAddQuestion }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [image, setImage] = useState(null);

  // Function to handle changes in the question input field
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Function to handle changes in the option input fields
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Function to handle adding the question to the current list
  const handleAddQuestion = () => {
    // Create question object based on category
    const newQuestion = {
      category,
      question,
      options: category === "trueFalse" ? null : options, // Set options to null for true/false questions
      image: category === "imageIdentification" ? image : null, // Set image to null for non-image identification questions
    };
    // Pass the new question to the parent component
    onAddQuestion(newQuestion);
    // Reset form fields
    setQuestion("");
    setOptions(["", "", "", ""]);
    setImage(null);
  };

  return (
    <>
      <div className={styles.container}>
        <h2>
          Add{" "}
          {category === "mcq"
            ? "Multiple Choice"
            : category === "trueFalse"
            ? "True or False"
            : "Image Identification"}{" "}
          Question:
        </h2>
        {/* Input field for the question */}
        <div className={styles.formField}>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter your question"
          />
        </div>
        {/* Render options for multiple choice questions */}
        {category === "mcq" && (
          <div className={styles.multipleChoiceOptions}>
            {[0, 1, 2, 3].map((index) => (
              <div
                className={styles.formField}
                key={index}
              >
                <label htmlFor={`option${index + 1}`}>{`Option ${
                  index + 1
                }:`}</label>
                <input
                  type="text"
                  id={`option${index + 1}`}
                  value={options[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Enter option ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
        {/* Render file input for image identification questions */}
        {category === "imageIdentification" && (
          <div className={styles.formField}>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        )}
        {/* Add question button */}
        <button
          onClick={handleAddQuestion}
          className={styles.addButton}
        >
          Add Question
        </button>
      </div>
    </>
  );
}

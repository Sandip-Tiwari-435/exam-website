// components/QuestionCard.js
import React from "react";
import styles from "../styles/QuestionCard.module.css";

export default function QuestionCard({ question }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {question.category === "imageIdentification" && (
          <img
            src={question.image}
            alt="Question"
            className={styles.image}
          />
        )}
        <p className={styles.question}>{question.question}</p>
        {question.category === "mcq" && (
          <ul className={styles.options}>
            {question.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

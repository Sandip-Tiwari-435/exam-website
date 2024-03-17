// components/ExamPreview.js
import React from "react";
import styles from "../styles/ExamPreview.module.css";

export default function ExamPreview({ questions }) {
  return (
    <div className={styles.container}>
      <h2>Exam Preview</h2>
      {/* Render questions here */}
    </div>
  );
}

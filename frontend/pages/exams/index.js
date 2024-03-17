// pages/exams/index.js
import Link from "next/link";
import styles from "../../styles/Exams.module.css";

export default function Exams() {
  return (
    <div className={styles.container}>
      <h1>Your Exams</h1>
      <Link href="/exams/create">
        <button className={styles.button}>Create New Exam</button>
      </Link>
      {/* List existing exams here */}
    </div>
  );
}

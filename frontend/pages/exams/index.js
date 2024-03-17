// pages/exams/index.js
import Link from "next/link";
import styles from "../../styles/Exams.module.css";
import { useRouter } from "next/router";


export default function Exams() {
  const router = useRouter();

  const handleCreateExam = () => {
    const examName = window.prompt('Enter the name of the exam:');

    if (examName) {
      router.push(`/exams/create?param1=${examName}`);
    } else {
      console.log('Exam creation canceled');
    }
  };
  return (
    <div className={styles.container}>
      <h1>Your Exams</h1>
      <button onClick={handleCreateExam} className={styles.button}>Create New Exam</button>
      {/* List existing exams here */}
    </div>
  );
}

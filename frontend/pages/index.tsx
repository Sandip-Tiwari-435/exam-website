// pages/index.js
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Exam App</h1>
      <Link href="/exams">
        <button className={styles.button}>Start Creating Exams</button>
      </Link>
    </div>
  );
}

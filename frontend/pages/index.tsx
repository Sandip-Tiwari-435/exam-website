// pages/index.js
import Link from "next/link";
import styles from "../styles/Home.module.css";
import PageLayout from "../components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1>Welcome to the Exam App</h1>
      </div>
    </PageLayout>
    // <PageLayout>
    //   <h1>Welcome to the Exam App</h1>
    // </PageLayout>
  );
}

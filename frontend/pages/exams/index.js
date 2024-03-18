// pages/exams/index.js
import Link from "next/link";
import React, { useState,useEffect } from "react";
import styles from "../../styles/Exams.module.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function Exams() {
  const router = useRouter();

  const [examId, setExamId] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const response = await axios.get('http://localhost:3001/api/exams');
      console.log(response.data);
      setExamId([...examId, ...response.data]);
      
    };
    fetchData();

  },[]);

  const handleRouting = (id) => {
    router.push(`/exams/form/${id}`)
  }
  const handleDeletion = (id) => {
    axios.delete(`http://localhost:3001/api/exams/delete/${id}`).then((req,res)=>{
      (async ()=>{const response=await axios.get('http://localhost:3001/api/exams');
      console.log(response.data);
      setExamId([...response.data]);})();
      
    })
    
  }
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
      <h1>Your Exams</h1><span onClick={()=>router.push("/exams/admin")} className={styles.reports}>Check reports</span>
      <button onClick={handleCreateExam} className={styles.button}>Create New Exam</button>
      {/* List existing exams here */}
      {examId.map((exam,i)=>{
        return (
          <div  className={styles.examIndi}>
            <span onClick={()=>handleRouting(exam._id)} className={styles.examGo}>{exam.title}</span>
            <span onClick={()=>handleDeletion(exam._id)} className={styles.examDelete}>Delete</span>
          </div>
        )
      })}
    </div>
  );
}

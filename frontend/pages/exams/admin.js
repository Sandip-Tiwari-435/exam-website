// pages/exams/create.js
import React, { useState,useEffect } from "react";
import styles from "../../styles/CreateExam.module.css";
import axios from "axios";

export default function FormExam() {
  const [query, setQuery] = useState({});

  useEffect(() => {
    const dummyQuery = {};
    dummyQuery["roll"]=null;
    dummyQuery["date"]=null;
    dummyQuery["examname"]=null;
    setQuery({...dummyQuery});
  },[]);

  const inputChanger = (q,v) => {
    console.log({q:v});
    const dummyQuery = {...query};
    dummyQuery[q]=v;
    setQuery({...dummyQuery});
    console.log(dummyQuery);
  }

  const submitExam = async () => {
    try {
      console.log(query);
      const response = await axios.post("http://localhost:3001/api/report", 
      query,
      {headers:{"Content-Type" : "application/json"}});
        console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.examHeading}>Filter and generate reports</div>
        <div>
            <input
                type="text"
                id="roll"
                name="roll"
                placeholder="Search by roll no..."
                onChange={(e) => inputChanger("roll",e.target.value)}
            />
            <label htmlFor="roll"></label>
            <input
                type="text"
                id="date"
                name="date"
                placeholder="Enter date of submission(dd-mm-yyyy)..."
                onChange={(e) => inputChanger("date",e.target.value)}
            />
            <label htmlFor="date"></label>
            <input
                type="text"
                id="examname"
                name="examname"
                placeholder="Exam name..."
                onChange={(e) => inputChanger("examname",e.target.value)}
            />
            <label htmlFor="examname"></label>
        </div>
        <button onClick={() => submitExam()} className={styles.submitButton}>
            Get Report
        </button>
    </div>
  );
}

// pages/exams/create.js
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../../styles/CreateExam.module.css";

export default function FormExam() {
  const router = useRouter();  
  const { id } = router.query;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/exams/${id}`).then((response)=>{

      setQuestions([...questions, ...response.data.questions]);      
      console.log(response.data.questions);
    });
  },[]);

  const submitExam = async () => {
    try {
      console.log(JSON.stringify({ questions }));
      const response = await axios.post("http://localhost:3001/api/exams", {
        title: param1,
        questions: questions,
      },{headers:{"Content-Type" : "application/json"}});
      console.log(response.data); // Log response from the server
      router.push(`http://localhost:3001/api/exams/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      {questions.map((question,i)=>{
        console.log(question);
        if(question.category==="mcq") {
          return (
            <div>
              {`Question No. ${i+1}: ${question.question}`}
              <br />
              <input
                type="radio"
                id="option1"
                name={question._id}
                value={question.options[0]}
              />
              <label htmlFor="option1">{question.options[0]}</label>
              <br />
              <input
                type="radio"
                id="option2"
                name={question._id}
                value={question.options[1]}
              />
              <label htmlFor="option2">{question.options[1]}</label>
              <br />
              <input
                type="radio"
                id="option3"
                name={question._id}
                value={question.options[3]}
              />
              <label htmlFor="option3">{question.options[3]}</label>
              <br />
              <input
                type="radio"
                id="option4"
                name={question._id}
                value={question.options[4]}
              />
              <label htmlFor="option4">{question.options[4]}</label>
              <br />
      <br />

            </div>
          )
        }
        else if(question.category==="trueFalse") {
          return (
            <div>
              {`Question No. ${i+1}: ${question.question}`}
              <br />
              <input
                type="radio"
                id="option1"
                name={question._id}
                value="True"
              />
              <label htmlFor="option1">True</label>
              <br />
              <input
                type="radio"
                id="option2"
                name={question._id}
                value="False"
              />
              <label htmlFor="option2">False</label>
              <br />
            </div>
          )
        }
        else if(question.category==="imageIdentification") {
          return (
            <div>
              <img src={question.image}/>
              {`Question No. ${i+1}: ${question.question}`}
              <br />
              <input
                type="radio"
                id="option1"
                name={question._id}
                value="True"
              />
              <label htmlFor="option1">True</label>
              <br />
              <input
                type="radio"
                id="option2"
                name={question._id}
                value="False"
              />
              <label htmlFor="option2">False</label>
              <br />
            </div>
          )
        }
      })}
      {/* Submit button */}
      <button onClick={() => submitExam()} className={styles.submitButton}>
        Submit Exam
      </button>
    </div>
  );
}

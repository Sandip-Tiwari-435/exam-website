// pages/exams/create.js
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../../styles/CreateExam.module.css";

export default function FormExam() {
  const router = useRouter();  
  const { id } = router.query;

  const [questions, setQuestions] = useState([]);
  const [examName, setExamName] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [roll, setRoll] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/exams/${id}`).then((response)=>{

      setQuestions([...response.data.questions]);  
      setExamName(response.data.title); 
      const dummySol = {};
      response.data.questions.map((question)=>{
        dummySol[question._id]=null;
      })   
      setSolutions({...dummySol});
      console.log(response.data.questions);
    });
  },[]);

  const inputChanger = (qId,sol) => {
    console.log(qId);
    const dummySol = {...solutions};
    dummySol[qId]=sol;
    setSolutions({...dummySol});
  }

  const submitExam = async () => {
    try {
      if(!roll) {window.alert("Please enter your roll correctly");return; }
      console.log(solutions);
      const data = {roll:roll,eId:id,eName:examName};
      const arr=[];
      for (const key in solutions){
        arr.push({qId:key,sol:solutions[key]});
      }
      data.sols=[...arr];
      console.log(data);
      const response = await axios.post("http://localhost:3001/api/student/submit", 
      data,
      {headers:{"Content-Type" : "application/json"}});
      router.push("/exams/submitSuccess");

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.examHeading}>Exam for {examName}</div>
      <div className={styles.questionType} >
        <input type="number" required={true} placeholder="Enter your roll no here...." onChange={(e)=> setRoll(e.target.value)} />
      </div>
      {questions.map((question,i)=>{
        // console.log(question);
        if(question.category==="mcq") {
          return (
            
            <div className={styles.questionType}>
              {`Question No. ${i+1}: ${question.question}`}
              <br />
              <input
                type="radio"
                id="option1"
                name={question._id}
                value={question.options[0]}
                onChange={(e) => inputChanger(question._id,e.target.value)}
              />
              <label htmlFor="option1">{question.options[0]}</label>
              <br />
              <input
                type="radio"
                id="option2"
                name={question._id}
                value={question.options[1]}
                onChange={(e) => inputChanger(question._id,e.target.value)}
              />
              <label htmlFor="option2">{question.options[1]}</label>
              <br />
              <input
                type="radio"
                id="option3"
                name={question._id}
                value={question.options[2]}
                onChange={(e) => inputChanger(question._id,e.target.value)}
              />
              <label htmlFor="option3">{question.options[2]}</label>
              <br />
              <input
                type="radio"
                id="option4"
                name={question._id}
                value={question.options[3]}
                onChange={(e) => inputChanger(question._id,e.target.value)}
              />
              <label htmlFor="option4">{question.options[3]}</label>
              <br />
      <br />

            </div>
          )
        }
        else if(question.category==="trueFalse") {
          return (
            <div className={styles.questionType}>
              {`Question No. ${i+1}: ${question.question}`}
              <br />
              <input
                type="radio"
                id="option1"
                name={question._id}
                value="True"
                onChange={(e) => inputChanger(question._id,e.target.value)}
              />
              <label htmlFor="option1">True</label>
              <br />
              <input
                type="radio"
                id="option2"
                name={question._id}
                value="False"
                onChange={(e) => inputChanger(question._id,e.target.value)}
              />
              <label htmlFor="option2">False</label>
              <br />
            </div>
          )
        }
        else if(question.category==="imageIdentification") {
          return (
            <div className={styles.questionType}>
              <img src={question.image} /><br/>
              {`Question No. ${i+1}: ${question.question}`}
              <br />
              <input
                type="text"
                id="option1"
                name={question._id}
                placeholder="Type your answer here..."
                onChange={(e) => inputChanger(question._id,e.target.value)}
              />
              <label htmlFor="option2"></label>
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



// {
//   roll:
//   eid:
//   sols: [
//     {
//       qid:
//       sol:
//     },
//     {

//     }
//   ]
// }

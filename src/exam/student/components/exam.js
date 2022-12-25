import Question from "./question"
import {useState} from "react";


export default function ExamGrid({exams,index,examId}){

    return(
        exams && exams.map((exam,idx)=>{
            return(
                <Question key={idx} examId={examId} exam={exam} idx={idx} index={index}/>
            )
        })
    )
}
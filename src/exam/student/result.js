import { Container } from "react-bootstrap"
import axios from "axios";
import toast from "react-hot-toast";
import { useState,useEffect } from "react";
import ResultTable from "./components/resultsTable";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("authenticationToken");

export default function MyResults(){
    const [results,setResults] = useState([]);

    const fetchResults = async ()=>{
        const {data:response} = await axios.get(`${SERVER_URL}/student/exams/result`,{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
          if(!response){
            toast.error("error",{duration:4000,position:"top-center"});
            return;
        }
        if(!response.success){
            toast.error(response.error || response.message,{duration:4000,position:"top-center"});
            return;
        }
        console.log(response.data);
        setResults(response.data);
    }

    useEffect(()=>{
        fetchResults();
    },[])
    return(
        <>
            <Container>
                <div className="bg-light p-2 mb-3">
                    <span className="fw-bold h3">My Results</span>
                </div>
                <div>
                    <ResultTable props={results}/>
                </div>
            </Container>
        </>
    )
}
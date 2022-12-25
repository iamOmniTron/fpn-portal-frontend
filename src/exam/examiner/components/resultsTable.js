import { Table } from "react-bootstrap"

export default function ResultTable({results}){
        return(
            <>
                <Table striped bordered hover responsive size="lg" className="bg-light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>FULL NAME</th>
                            <th>MATRIC NUMBER</th>
                            <th>GENDER</th>
                            <th>DEPARTMENT</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            results.results && results.results.map((el,idx)=>{
                                return(
                                        <tr key={idx}>
                                            <td>{idx +1}</td>
                                            <td>{el.Candidate.firstname} {el.Candidate.middlename} {el.Candidate.lastname}</td>
                                            <td>{el.Candidate.matricNumber}</td>
                                            <td>{el.Candidate.gender}</td>
                                            <td>{el.Candidate.Admission.Department.name}</td>
                                            <td>{el.total}/{results.total}</td>
                                        </tr>  
                                )
                            })
                        }
                    </tbody>
                </Table>
            </>
        )
    }
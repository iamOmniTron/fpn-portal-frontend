import { Table } from "react-bootstrap"

export default function ResultTable({props}){
        return(
            <>
                <Table striped bordered hover responsive size="lg" className="bg-light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>COURSE TITLE</th>
                            <th>COURSE CODE</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            props && props.map((el,idx)=>{
                                return(
                                        <tr key={idx}>
                                            <td>{idx +1}</td>
                                            <td>{el.Exam.Course.title}</td>
                                            <td>{el.Exam.Course.code}</td>
                                            <td>{el.total}</td>
                                        </tr>  
                                )
                            })
                        }
                    </tbody>
                </Table>
            </>
        )
    }
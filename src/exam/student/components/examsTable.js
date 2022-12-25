import { Table,Button } from "react-bootstrap"
import { BoxArrowRight } from "react-bootstrap-icons"
import {useNavigate} from "react-router-dom";

const STATUSES = {
    true:"Active",
    false:"Inactive"
}


export default function ExamsTable({props}){
    const navigate = useNavigate();
    return(
        <>
            <Table striped bordered hover responsive size="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>COURSE TITLE</th>
                        <th>COURSE CODE</th>
                        <th>UNIT</th>
                        <th>DURATION</th>
                        <th>ACTION</th>
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
                                        <td>{el.Exam.Course.unit}</td>
                                        <td>{el.Exam.duration} minutes</td>
                                        <td>
                                            <Button className="btn-success btn-sm rounded-0"
                                            onClick={()=>navigate("instructions",{state:{e_id:el.Exam.id}})}>
                                                Proceed to Exam
                                                <BoxArrowRight className="ms-1"/>
                                            </Button>
                                        </td>
                                    </tr>  
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
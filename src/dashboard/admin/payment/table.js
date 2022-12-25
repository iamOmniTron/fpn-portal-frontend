import {Table as Tb} from "react-bootstrap"


// const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const STATUSES = {
    true:"Successful",
    false:"Not Successful"
}


export default function Table({props:payments}){

    return(
        <>
            <Tb striped bordered hover responsive size="sm">
            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Payment Reference number</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments && payments.map((payment,idx)=>{
                                        return(
                                            <tr key={payment.id}>
                                                <td>
                                                    {idx +1}
                                                </td>
                                                <td style={{minWidth:"3em"}}>
                                                    {payment.Candidate.firstname}

                                                    {payment.Candidate.Candidate.middlename}

                                                    {payment.Candidate.lastname}
                                                </td>
                                                <td>
                                                    {payment.description}
                                                </td>
                                                <td>
                                                    {payment.refId}
                                                </td>
                                                <td>
                                                    {(new Date(payment.createdAt).toDateString())}
                                                </td>
                                                <td>
                                                    {STATUSES[payment.confirmed]}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
            </Tb>
        </>
    )
}
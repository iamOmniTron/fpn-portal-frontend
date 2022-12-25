import {Spinner} from "react-bootstrap";

export default function Loader(){
    return(
       <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
            <Spinner className="w-25 h-25" animation="border"/>
       </div>
    )
}
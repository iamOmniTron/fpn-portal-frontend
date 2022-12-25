import { Navbar,Container, Button } from "react-bootstrap"; 
import {List, PersonCircle} from "react-bootstrap-icons";

export default function NavBar(){
    return(
        <>
            <Navbar style={{height:"10vh"}} className="bg-light shadow">
        <Container>
            <div className="ms-auto">
            <PersonCircle className="fs-3"/>
            </div>
        </Container>
      </Navbar>
        </>
    )
}
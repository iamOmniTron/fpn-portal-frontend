import {Navbar,Nav,Container,Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Laptop,Journal} from "react-bootstrap-icons"


export default function NavBar({show}){
    return(
        <>
            <Navbar sticky="top" bg="success" expand="lg" variant="dark" className="mb-5">

        <Container>
          <Navbar.Brand className="ms-3">
          <img src="../../../fpn.jpg" width="50" height="40" alt="portal logo" className="pe-2 d-inline-block align-top rounded"/>
            <LinkContainer to="/exam" className="ps-2">
            <span className="fw-bold text-uppercase d-none d-lg-inline-block">Student Portal</span>
            </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="toggle-nav" />
            <Navbar.Collapse id="toggle-nav">
            <Nav className="ms-auto text-light">
            <LinkContainer to="">
            <Nav.Link className="text-light d-flex align-items-center me-2">
                <Laptop/>
                Exams
            </Nav.Link>
            </LinkContainer>
            <LinkContainer to="results">
            <Nav.Link className="text-light d-flex align-items-center me-2">
                <Journal/>
                Results
            </Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="students">
            <Nav.Link className="text-light d-flex align-items-center me-2">
                <PeopleFill/>
                Students
            </Nav.Link>
            </LinkContainer> */}
            {/* <LinkContainer to="result">
            <Nav.Link className="text-light d-flex align-items-center me-2">
                <Journal/>
                Results
            </Nav.Link>
            </LinkContainer> */}
            </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
    )
}
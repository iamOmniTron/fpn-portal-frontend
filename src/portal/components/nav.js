import {Navbar,Nav,Container} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ShieldLock,PencilSquare,Paypal,PersonFill } from "react-bootstrap-icons";

export default function NavBar(){
    return (
        <>
        <Navbar bg="secondary" expand="lg" variant="dark" className="mb-5" style={{borderBottom:"1px solid red"}}>
        <Container>
          <Navbar.Brand className="ms-3">
          <img src="../../../fpn.jpg" width="50" height="40" alt="portal logo" className="pe-2 d-inline-block align-top rounded"/>
            <LinkContainer to="/portal/applicant">
            <span className="fw-bold text-uppercase d-none d-lg-inline-block">Applicant Portal</span>
            </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="toggle-nav" />
            <Navbar.Collapse id="toggle-nav">
          <Nav className="ms-auto text-light">
            <LinkContainer to="">
              <Nav.Link className="d-flex align-items-center me-2 text-light">
                    <PencilSquare />
                Admission
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="payments">
            <Nav.Link className="text-light d-flex align-items-center me-2">
                    <Paypal />
                Payments
            </Nav.Link>
            </LinkContainer>
            <LinkContainer to="profile">
            <Nav.Link className="text-light d-flex align-items-center me-2">
                    <PersonFill />
                Profile
            </Nav.Link>
            </LinkContainer>
            <LinkContainer to="password/reset">
              <Nav.Link className="text-light d-flex align-items-center">
                <ShieldLock />
                Reset Password
                </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
    )
}
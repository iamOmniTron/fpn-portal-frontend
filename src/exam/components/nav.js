import {Navbar,Nav,Container,Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Laptop} from "react-bootstrap-icons"


export default function NavBar({show}){
    return(
        <>
            <Navbar sticky="top" bg="info" expand="lg" variant="dark" className="mb-5">
        <Container>
            
          <Navbar.Brand className="ms-3">
            <Laptop/>
            <LinkContainer to="/exam" className="ps-2">
            <span className="fw-bold text-uppercase d-none d-lg-inline-block">Examination Portal</span>
            </LinkContainer>
            </Navbar.Brand>
            <LinkContainer to="">
              <Nav.Link className="d-flex align-items-center me-2 text-light">
                <Button className="shadow-lg btn-primary text-light rounded-0 fw-bold" onClick={show}>
                    Login
                </Button>
                </Nav.Link>
            </LinkContainer>
        </Container>
      </Navbar>
        </>
    )
}
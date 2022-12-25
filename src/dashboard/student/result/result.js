import { Container,Card,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {EmojiFrownFill} from "react-bootstrap-icons"


export default function StudentResult(){
    return(
        <>
            <Container>
                <div className=" d-flex justify-content-center align-items-center" style={{height:"70vh"}}>
                    <Card className="shadow-lg rounded-0" style={{minHeight:"50vh"}}>
                        <Card.Body className="d-flex flex-column align-items-center">
                    <h3>Sorry, Results are unavailable at the moment</h3>
                    <EmojiFrownFill style={{width:"30%",height:"25%"}}/>
                    <LinkContainer to="/exam">
                    <Button variant="link">
                        Navigate to Exam Portal
                    </Button>
                    </LinkContainer>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}
import {Container,Form,Card,Button,FloatingLabel} from "react-bootstrap";

export default function ApplicantResetPassword(){
    return(
        <> 
            <Container className="d-flex justify-content-center align-items-center">
                <Card className="rounded-0 shadow-lg" style={{minWidth:"50vw"}}>
                    <Card.Header>
                        <span className="fw-bold fs-3 text-warning">Reset your portal Password</span>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <FloatingLabel label="Enter current password" controlId="currPass" className="mb-3">
                                <Form.Control type="password" placeholder="current password"/>
                            </FloatingLabel>
                            <FloatingLabel label="Enter new password" controlId="newPass" className="mb-3">
                                <Form.Control type="password" placeholder="new password"/>
                            </FloatingLabel>
                            <FloatingLabel label="Re-enter new password" controlId="confirmPass" className="mb-3">
                                <Form.Control type="password" placeholder="re-enter password"/>
                            </FloatingLabel>
                            <div className="text-center">
                                <Button className="rounded-0 btn-lg btn-success">
                                    Confirm
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
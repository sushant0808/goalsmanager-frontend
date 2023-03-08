import React from 'react'
import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const ResetPasswordComp = () => {
    const [showAlert, setShowAlert] = useState({
        message: '',
        color: '',
        show: false,
    });
    const navigate = useNavigate();
    const { userId } = useParams();
    console.log('userid', userId);

    const [resetPasswordInfo, setResetPasswordInfo] = useState({
        newPassword: "",
        confirmPassword: "",
    })

    const resetPasswordHandler = async () => {
        if (resetPasswordInfo.newPassword && resetPasswordInfo.confirmPassword) {
            const resp = await axios.post("/reset-user-password", { newPassword: resetPasswordInfo.newPassword, confirmPassword: resetPasswordInfo.confirmPassword, userId });
            console.log('resp', resp);

            if (resp.data.status === 200) {
                navigate("/login");
            } else {
                setShowAlert({
                    message: resp.data.message,
                    color: 'danger',
                    show: true
                })
            }

        } else {
            setShowAlert({
                message: 'Reset password input fields cannot be empty',
                color: 'danger',
                show: true
            })
        }
    }
    return (
        <>
            <Container className="send-email-main-div">
                <Row className='send-email-row'>
                    <Col lg={12} className="send-email-alert-message-div">
                        {
                            showAlert.show && (
                                <Alert style={{ width: '50%' }} variant={showAlert.color} onClose={() => setShowAlert(false)} dismissible>
                                    <Alert.Heading>{showAlert.message}</Alert.Heading>
                                </Alert>
                            )
                        }
                    </Col>


                    <Col lg={6} className="send-email-div" style={{ border: 'none' }}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={resetPasswordInfo.newPassword}
                                    onChange={(e) => setResetPasswordInfo({ ...resetPasswordInfo, newPassword: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter email" value={resetPasswordInfo.confirmPassword}
                                    onChange={(e) => setResetPasswordInfo({ ...resetPasswordInfo, confirmPassword: e.target.value })} />
                            </Form.Group>
                            <Button variant="primary" onClick={resetPasswordHandler}>
                                Reset Password
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ResetPasswordComp
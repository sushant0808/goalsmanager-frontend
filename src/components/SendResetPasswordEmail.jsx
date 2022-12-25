import React from 'react'
import { useState } from 'react'
import { axiosInstance } from '../axiosInstance';
import Cookies from 'js-cookie';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

const SendResetPasswordEmail = () => {
    const [showAlert, setShowAlert] = useState({
        message: '',
        color: '',
        show: false,
    });
    const [emailInput, setEmailInput] = useState("");
    const sendResetPasswordEmail = async () => {
        if (emailInput) {
            console.log('bass');
            const resp = await axiosInstance.post("/send-forgot-password-email", { userEmail: emailInput }, { headers: { "Authorization": `Bearer ${Cookies.get('token')}` } })

            setShowAlert({
                message: resp.data.message,
                color: resp.data.status === 200 ? 'success' : 'danger',
                show: true,
            })

            console.log('resp of email', resp);
            setEmailInput("");
        } else {
            setShowAlert({
                message: 'Email input cannot be empty',
                color: 'danger',
                show: true,
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

                    <Col lg={4} className="send-email-div">
                        <h2>Password Assistance</h2>
                        <p style={{ fontSize: '14px' }}>Enter the email address or mobile phone number associated with your account.</p>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="email" placeholder="Enter email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" onClick={sendResetPasswordEmail} style={{ width: '100%' }}>
                                Send email
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center mt-4'>
                        <Link to="/login">Go back to login</Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SendResetPasswordEmail
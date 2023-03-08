import React from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Alert, Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosInstance';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../TodoActionCreators';
import { messageDisplayHelper } from '../utils/messageDisplayHelper';


const Registration = () => {
    const responseMessage = useSelector(state => state.responseMessage);
    const [loginResponseMessage, setLoginResponseMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const errorCss = {
        color: 'red',
        fontWeight: 'bold',
    }
    const [userFieldsError, setUserFieldsError] = useState({});
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
    })

    const validateUserFields = (userData) => {
        const errors = {};

        if (!userData.username) {
            errors.username = "Username field cannot be empty"
        }

        if (!userData.password) {
            errors.password = "Password field cannot be empty"
        }

        if (!userData.email) {
            errors.email = "Email field cannot be empty"
        }

        return errors;
    }

    const registerUserHandler = async () => {
        const errors = validateUserFields(userInfo);
        console.log('Errors', errors);


        if (Object.keys(errors).length > 0) {
            // console.log('Errors', errors);
            setUserFieldsError(errors);
        } else {
            console.log('Else me');
            setUserFieldsError({}); // If there are no errors then set it to empty object
            const response = await axios.post("/register", userInfo, { withCredentials: true });

            console.log('Registration', response);

            dispatch(setUser(response.data.userObj));

            // Here I have to manually set cookies in frontend because when I am hosting this website the backend is not able to send cookies to frontend
            // if (response.data.status === 200) {
            //     Cookies.set('token', response.data.token);
            // }

            // Setting the reponse message whether success/error 
            messageDisplayHelper(response,dispatch);

            // Setting state to true to display the response message
            setLoginResponseMessage(true);

            if(response.data.status === 200){
                // console.log('in iffffff')
                // setTimeout(() => {
                //     console.log('in setTimeOut')
                //     navigate("/todo-list");
                // },1000) 
                navigate("/todo-list");
            }


        }

    }

    return (
        <>
            <Container>
                <Row style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>


                    {/* Alert Message */}
                    <div style={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'center' }}>
                        {
                            loginResponseMessage ? (
                                <Alert style={{ width: '400px' }} variant={responseMessage.variant} onClose={() => setLoginResponseMessage(false)} dismissible>
                                    {
                                        responseMessage.message
                                    }
                                </Alert>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>

                    <Col lg={6} style={{ height: 'auto' }}>
                        <h1>Register</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={userInfo.username}
                                    onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} />
                                <span className='error'>{userFieldsError.username}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                                <span className='error'>{userFieldsError.email}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={userInfo.password}
                                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
                                <span className='error'>{userFieldsError.password}</span>
                            </Form.Group>

                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}


                            <Button variant="primary" onClick={registerUserHandler}>
                                Create Account
                            </Button>
                            <p className='mt-2'>Already have an account ? <Link to="/login">Login</Link></p>
                        </Form>
                    </Col>
                </Row>
            </Container>



        </>
    )
}

export default Registration
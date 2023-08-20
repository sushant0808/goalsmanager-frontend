import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { messageDisplayHelper } from "../utils/messageDisplayHelper";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../axiosInstance";
import Cookies from "js-cookie";
import { setUser } from "../TodoActionCreators";

const Login = () => {
  const [loginResponseMessage, setLoginResponseMessage] = useState(false);
  const [loginError, setLoginError] = useState({});
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const responseMessage = useSelector((state) => state.responseMessage);
  const dispatch = useDispatch();

  const validateUserFields = () => {
    const errors = {};

    if (!emailRef.current.value) {
      errors.email = "Email field cannot be empty";
    }

    if (!passwordRef.current.value) {
      errors.password = "Password field cannot be empty";
    }

    return errors;
  };

  const loginUserHandler = async () => {
    const errors = validateUserFields();

    if (Object.keys(errors).length > 0) {
      return setLoginError(errors);
    }
    setLoginError({});

    // If there are no validation errors then the api call is done and we get the response from the server.
    const response = await axiosInstance.post(
      "/login",
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      { withCredentials: true }
    );

    console.log("Login", response);

    // Here I have to manually set cookies in frontend because when I am hosting this website the backend is not able to send cookies to frontend
    if (response.data.status === 200) {
      Cookies.set("token", response.data.token);
    }

    // Set the user in our state/store so that we can access it across the application
    dispatch(setUser(response.data.userObj));

    // Setting the reponse message whether success/error
    messageDisplayHelper(response, dispatch);

    // Setting state to true to display the response message
    setLoginResponseMessage(true);

    if (response.data.status === 200) {
      console.log("in iffffff");
      setTimeout(() => {
        console.log("in setTimeOut");
        navigate("/todo-list");
      }, 1000);
    }
  };

  return (
    <>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            {loginResponseMessage ? (
              <Alert
                style={{ width: "400px" }}
                variant={responseMessage.variant}
                onClose={() => setLoginResponseMessage(false)}
                dismissible
              >
                {responseMessage.message}
              </Alert>
            ) : (
              <div></div>
            )}
          </div>

          <Col lg={6} style={{ height: "auto" }}>
            <h1>Login</h1>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                />
                <span className="error">{loginError.email}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
                <span className="error">{loginError.password}</span>
              </Form.Group>
              <Button variant="primary" onClick={loginUserHandler}>
                Login
              </Button>

              <p className="mt-2">
                Don't have an Account ?{" "}
                <Link to="/register">Create Account</Link>
              </p>
              <p className="mt-2">
                Forgot Password ?{" "}
                <Link to="/reset-password-email">Resest Password</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

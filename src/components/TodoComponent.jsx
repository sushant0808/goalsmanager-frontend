import { Alert, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux'
import { addTask, clearAllTaskCreator, displayTask, messageActionCreator, showAllTaskCreator, showCompleteTaskCreator, showIncompleteTaskCreator, showSortTaskCreator } from '../TodoActionCreators';
import SingleTodo from './SingleTodo';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { messageDisplayHelper } from '../utils/messageDisplayHelper';
import { axiosInstance } from '../axiosInstance';

const TodoComponent = () => {
    const [todoOperationMessage, setTodoOperationMessage] = useState(false);
    const navigate = useNavigate();
    const [userTaskInput, setUserTaskInput] = useState("");
    const [userInputError, setUserInputError] = useState(false);
    const todos = useSelector(state => state.todos);
    const responseMessage = useSelector(state => state.responseMessage);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log('user', user);

    console.log('Todo state', todos);

    useEffect(() => {
        let token = Cookies.get('token');
        // axios.get("http://localhost:8002/authenticate-user",{ headers: {"Authorization" : `Bearer ${token}`} })
        if (!token) {
            console.log('Bas ab');
            navigate("/login");
        } else {
            const fetchAllTasks = async () => {
                const response = await axios.get("/users-all-tasks", { headers: { "Authorization": `Bearer ${token}` } })
                // const response = await axios.get("http://localhost:5000/users-all-tasks", { headers: { "Authorization": `Bearer ${token}` } })

                dispatch(displayTask(response.data.allTasks));
            }
            fetchAllTasks();
        }
    }, [])

    async function addTodoBtnHandler() {
        console.log('called');
        if (userTaskInput) {
            const response = await axios.post("/add-user", {
                taskId: uuid().slice(0, 8),
                task: userTaskInput,
                isComplete: false,
            }, { headers: { "Authorization": `Bearer ${Cookies.get('token')}` } })

            console.log('added resp', response);
            if (response.data.status === 200) {
                dispatch(addTask(response.data.createdTask));
            }

            // Setting success/error message of the operation performed for user to know
            messageDisplayHelper(response, dispatch);

            // Showing the success/error message
            setTodoOperationMessage(true);
        } else {
            dispatch(messageActionCreator({ message: 'Task input cannot be empty', variant: 'danger' }));

            // Showing the success/error message
            setTodoOperationMessage(true);
        }

        setUserTaskInput("");
    }

    const logOutUser = () => {
        Cookies.remove('token')
        dispatch(clearAllTaskCreator())
        navigate("/login")
    }

    const handleTaskStatusChange = async (e) => {
        const response = await axios.get('/users-all-tasks', { headers: { "Authorization": `Bearer ${Cookies.get('token')}` } })

        console.log('response', response);
        if (e.target.value === 'complete') {
            dispatch(showCompleteTaskCreator(response.data.allTasks))
        } else if (e.target.value === 'incomplete') {
            dispatch(showIncompleteTaskCreator(response.data.allTasks))
        } else {
            dispatch(showAllTaskCreator(response.data.allTasks))
        }

        // Setting success/error message of the operation performed for user to know
        messageDisplayHelper(response, dispatch);

        // Showing the success/error message
        setTodoOperationMessage(true);
    }

    const handleSortHandler = (e) => {
        setTimeout(() => {
            const newArr = [...todos];
            newArr.sort(function (a, b) {
                var nameA = a.task.toLowerCase(), nameB = b.task.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    if (e.target.value === 'asc') {
                        return -1;
                    } else {
                        return 1;
                    }
                if (nameA > nameB)
                    if (e.target.value === 'asc') {
                        return 1;
                    } else {
                        return -1;
                    }
                return 0; //default return value (no sorting)
            });

            dispatch(showSortTaskCreator(newArr));
        }, 1000);
    }

    return (
        <>

            {
                <Container fluid="md">
                    <div style={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'space-between' }}>
                        {
                            todoOperationMessage ? (
                                <Alert variant={responseMessage.variant} onClose={() => setTodoOperationMessage(false)} dismissible>
                                    {
                                        responseMessage.message
                                    }
                                </Alert>
                            ) : (
                                <div></div>
                            )
                        }
                        <Button onClick={logOutUser}>Log out</Button>
                        <p>Welcome <b>{user.username}</b></p>
                    </div>


                    <Row className="common-row todo-header-row">
                        <Col lg={7}>
                            <InputGroup>
                                <Form.Control
                                    placeholder="Eg:- Meditation"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={userTaskInput}
                                    onChange={(e) => setUserTaskInput(e.target.value)}
                                />
                                <InputGroup.Text id="basic-addon2" style={{ padding: '0' }}>
                                    <Button onClick={addTodoBtnHandler}>Add</Button>
                                </InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>

                    <hr></hr>
                    <div style={{ height: '450px', overflowY: 'auto', overflowX: 'hidden' }}>
                        <Row className='common-row'>
                            <Col lg={7} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                                <label>Filter</label>
                                <select className='form-control' style={{ width: "20%", cursor: 'pointer' }} onChange={handleTaskStatusChange}>
                                    <option value="all">All</option>
                                    <option value="complete">Complete</option>
                                    <option value="incomplete">Incomplete</option>
                                </select>

                                <label>Sort</label>
                                <select className='form-control' style={{ width: "20%", cursor: 'pointer' }} onChange={handleSortHandler}>
                                    <option value="all">Select</option>
                                    <option value="asc">Sort (A - Z)</option>
                                    <option value="desc">Sort (Z - A)</option>
                                </select>
                            </Col>
                        </Row>


                        {
                            todos.length ? todos.map((todo) => {
                                return (
                                    <SingleTodo todo={todo} key={todo.taskId} todoOperationMessage={todoOperationMessage} setTodoOperationMessage={setTodoOperationMessage} />
                                )
                            }) : (
                                <>
                                    <h2 className='text-center mt-5'>No tasks created</h2>
                                </>
                            )
                        }
                    </div>

                </Container>
            }


        </>
    )
}

export default TodoComponent
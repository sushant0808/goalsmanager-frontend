import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { GrEdit } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { MdDoneAll, MdRemoveDone } from 'react-icons/md';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux'
import { completeTaskCreator, deleteTask } from '../TodoActionCreators';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { messageDisplayHelper } from '../utils/messageDisplayHelper';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert'


const SingleTodo = ({ todo, todoOperationMessage, setTodoOperationMessage }) => {
    const [show, setShow] = useState(false);
    const [updateTaskInput, setUpdateTaskInput] = useState("");
    const [updateTaskInputError, setUpdateTaskInputError] = useState(false);
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const flexCommonProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    }

    let token = Cookies.get('token');
    const deleteTodoHandler = async (taskId) => {
        const response = await axios.delete(`http://localhost:8002/delete-user-task/${taskId}`, { headers: { "Authorization": `Bearer ${token}` } })
        console.log('This is resp of delete', response);

        dispatch(deleteTask(response.data.allTasks));

        // Setting success/error message of the operation performed for user to know
        messageDisplayHelper(response, dispatch);

        // Showing the success/error message
        setTodoOperationMessage(true);
    }

    const closeUpdateModal = () => {
        setShow(false)
        setUpdateTaskInputError(false);
    }

    const showUpdateModal = async () => {
        setShow(true)
    }

    const updateTodo = async (taskId) => {
        if (!updateTaskInput) {
            return setUpdateTaskInputError(true)
        }

        const response = await axios.post(
            `http://localhost:8002/update-user-task/${taskId}`,
            {
                newUpdatedTask: updateTaskInput.toLowerCase(),
            },
            { headers: { "Authorization": `Bearer ${token}` } })

        console.log('update ka reqp', response);

        dispatch(deleteTask(response.data.allTasks));

        // Setting success/error message of the operation performed for user to know
        messageDisplayHelper(response, dispatch);

        // Showing the success/error message
        setTodoOperationMessage(true);

        // Closing the modal
        setShow(false);
    }

    const completeTaskHandler = async (isComplete, taskId) => {
        // console.log('isComplete', isComplete);

        const response = await axios.post(`http://localhost:8002/update-task-status/${taskId}`,
            {
                isComplete,
            },
            { headers: { "Authorization": `Bearer ${token}` } })

        console.log('resp', response);



        dispatch(completeTaskCreator(response.data.allTasks))

        // Setting success/error message of the operation performed for user to know
        messageDisplayHelper(response, dispatch);

        // Showing the success/error message
        setTodoOperationMessage(true);
    }


    return (
        <Row className='common-row todo-main-row'>
            {/* <Alert variant={todo.isComplete === true ? 'success' : 'warning'}> */}
            <Col lg={7} style={{ display: 'flex', alignItems: 'center', background: todo.isComplete ? '#89c26d' : '#db4d4b', padding: '16px' }}>
                {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" onChange={completeTaskHandler}/>
                    </Form.Group> */}
                <div style={{ textTransform: 'capitalize', fontSize: '18px' }}><b>{todo.task}</b></div>
                <div style={{ marginLeft: 'auto', width: '40px', ...flexCommonProperties, marginRight: '20px', fontSize: '18px' }}>

                    {
                        todo.isComplete === true ? (
                            <MdRemoveDone title='Mark as incomplete'  style={{ fontSize: '22px' }} onClick={() => completeTaskHandler(todo.isComplete, todo.taskId)} />
                        ) : (
                            <MdDoneAll title='Mark as complete' style={{ fontSize: '22px' }} onClick={() => completeTaskHandler(todo.isComplete, todo.taskId)} />
                        )
                    }
                </div>
                <div style={{ marginRight: '20px', ...flexCommonProperties }}>
                    {/* Update task modal */}
                    <Modal show={show} onHide={closeUpdateModal}>
                        <Modal.Header closeButton>

                        </Modal.Header>
                        <Modal.Body>
                            <label>New task name</label>
                            <input type="text" className="form-control" placeholder="Eg: Yoga" required={true} value={updateTaskInput}
                                onChange={(e) => setUpdateTaskInput(e.target.value)}
                            />
                            {
                                updateTaskInputError ? (
                                    <span style={{ color: 'red' }}>Update input cannot be empty</span>
                                ) : null
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeUpdateModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => updateTodo(todo.taskId)}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <GrEdit title='Edit Task' style={{ fontSize: '18px' }} onClick={() => showUpdateModal(todo.taskId)} />
                </div>
                <div style={{ width: '40px', ...flexCommonProperties, color: 'black' }}>
                    <MdDelete title='Delete task' style={{ fontSize: '20px' }} onClick={() => deleteTodoHandler(todo.taskId)} />
                </div>
            </Col>
            {/* </Alert> */}
        </Row>
    )
}

export default SingleTodo
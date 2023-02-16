
import './App.css';
import TodoComponent from './components/TodoComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import SendResetPasswordEmail from './components/SendResetPasswordEmail';
import ResetPasswordComp from './components/ResetPasswordComp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from './axiosInstance';
import Cookies from 'js-cookie';
import { displayTask, setUser } from './TodoActionCreators';

function App() {

  const dispatch = useDispatch();

  const sendReminderEmail = async () => {
    let token = Cookies.get('token');
    const response = await axiosInstance.get("/send-reminder-email", { headers: { "Authorization": `Bearer ${token}` } })
    console.log('send reminder email wala',response);
  }

  useEffect(() => {
    var now = new Date();
    let timeForFirstEmail = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 30, 0, 0) - now;
    if (timeForFirstEmail < 0) {
      timeForFirstEmail += 86400000; // it's after 10am, try 10am tomorrow.
    }

    let timeForSecondEmail = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0, 0) - now;
    if (timeForSecondEmail < 0) {
      timeForSecondEmail += 86400000; // it's after 10am, try 10am tomorrow.
    }

    let timeToDeleteUsersTasks = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 45,50, 0) - now;
    if (timeToDeleteUsersTasks < 0) {
      timeToDeleteUsersTasks += 86400000; // it's after 10am, try 10am tomorrow.
    }

    // This setTimeout will execute at 07:30pm in the evening
    setTimeout(function () {
      sendReminderEmail();
    }, timeForFirstEmail);

    // This setTimeout will execute at 10:00pm in the evening
    setTimeout(function () {
      sendReminderEmail();
    }, timeForSecondEmail);

    // This below setTimeOut will automatically execute and delete logged in users all tasks at 00:00 am and this will happen everyday.
    setTimeout(() => {
      let token = Cookies.get('token');
      const deleteUserTasks = async () => {
        const resp = await axiosInstance.delete("/delete-users-all-tasks", { headers: { "Authorization": `Bearer ${token}` } });
        console.log('Users all task deleted resp', resp);

        dispatch(displayTask(resp.data.allTasks));
      }

      deleteUserTasks();
    }, timeToDeleteUsersTasks);
  }, [])

  console.log('App')
  useEffect(() => {
    const token = Cookies.get("token");
    // Get the authenticated user
    async function getAuthenticatedUser() {
      const resp = await axiosInstance.get("/get-authenticated-user", { headers: { "Authorization": `Bearer ${token}` } })
      console.log('resp hai be', resp);

      dispatch(setUser(resp.data.userData));
    }

    getAuthenticatedUser();

  }, [])

  return (
    <>
      {/* <TodoComponent/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/register" element={<Registration />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path='/todo-list' element={<TodoComponent />}></Route>
          <Route exact path='/reset-password-email' element={<SendResetPasswordEmail />}></Route>
          <Route exact path='/reset-password/:userId' element={<ResetPasswordComp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

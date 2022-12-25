
import './App.css';
import TodoComponent from './components/TodoComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
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
import { setUser } from './TodoActionCreators';

function App() {
  const dispatch = useDispatch();
  console.log('App')
  useEffect(() => {
    const token = Cookies.get("token");
    // Get the authenticated user
    async function getAuthenticatedUser(){
        const resp = await axiosInstance.get("/get-authenticated-user",{ headers: { "Authorization": `Bearer ${token}` } })
        console.log('resp hai be',resp);

        dispatch(setUser(resp.data.userData));
    }

    getAuthenticatedUser();

  },[])

  return (
    <>
      {/* <TodoComponent/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/todo-list' element={<TodoComponent/>}></Route>
          <Route path='/reset-password-email' element={<SendResetPasswordEmail/>}></Route>
          <Route path='/reset-password/:userId' element={<ResetPasswordComp/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

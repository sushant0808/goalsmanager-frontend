import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = () => {
    console.log('Home is called')
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        console.log('token in home',token);
        if(!token){
            navigate('/login');
        }else{
            navigate('/todo-list');
        }
    },[])

    return (
        <div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
            <Link to="/todo-list">Todo List</Link>
            </div>
        </div>
    )
}

export default Home
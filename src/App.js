
import './App.css';
import TodoComponent from './components/TodoComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';

function App() {
  return (
    <>
      {/* <TodoComponent/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/todo-list' element={<TodoComponent/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import { Routes, Route,useNavigate } from 'react-router-dom';
import { SignUpStudent } from './components/SignUpStudent';
import { Home } from '../src/pages/Home';
import { SignUpTeacher } from './components/SignUpTeacher';
import { SignInTeacher } from './components/SignInTeacher';
import { TeacherArea } from '../src/pages/TeacherArea';
import NavBar from '../src/components/NavBar';
import { AdminArea } from './pages/AdminArea';
import { AddClass } from './components/AddClass';
import { SignInSignUpAdmin } from './components/SignInSignUpAdmin';

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    <>
     
      <NavBar />  
       <br></br>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-student" element={<SignUpStudent />} />
        <Route path="/signup-teacher" element={<SignUpTeacher />} />
        <Route path="/signin-teacher" element={<SignInTeacher />} />
        <Route path="/signin-signup-admin" element={<SignInSignUpAdmin />} />
        <Route path="/add-class" element={<AddClass />} />
        <Route path="/admin-area" element={<AdminArea />} />
        <Route path="/teacher-area" element={<TeacherArea />} />
      </Routes>

    </>
  )
}
export default App

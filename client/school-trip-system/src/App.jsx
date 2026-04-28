import { useState } from 'react'
import './App.css'
import { Routes, Route,useNavigate } from 'react-router-dom';
import { SignUpStudent } from './components/SignUpStudent';
import { Home } from '../src/pages/Home';
import { SignUpTeacher } from './components/SignUpTeacher';
import { SignInTeacher } from './components/SignInTeacher';
import { PersonalArea } from '../src/pages/PersonalArea';
import NavBar from '../src/components/NavBar';
import { Admin } from './pages/Admin';
import { AddClass } from './components/AddClass';

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
        <Route path="/addClass" element={<AddClass />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/list-student" element={<PersonalArea />} />
      </Routes>

    </>
  )
}

export default App

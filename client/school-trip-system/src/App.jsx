import { useState } from 'react'
import './App.css'
import { Routes, Route,useNavigate } from 'react-router-dom';
import { SignUpStudent } from '../src/pages/SignUpStudent';
import { Home } from '../src/pages/Home';
import { SignUpTeacher } from '../src/pages/SignUpTeacher';
import { SignInTeacher } from '../src/pages/SignInTeacher';
import { PersonalArea } from '../src/pages/PersonalArea';

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    <>
      <h1>App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup-student" element={<SignUpStudent />} />
        <Route path="/signup-teacher" element={<SignUpTeacher />} />
        <Route path="/signin-teacher" element={<SignInTeacher />} />
        <Route path="/list-student" element={<PersonalArea />} />
      </Routes>

    </>
  )
}

export default App

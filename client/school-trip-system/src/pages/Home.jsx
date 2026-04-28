
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => navigate('/admin')}>כניסת מנהל</button>
        <button onClick={() => navigate('/signin-teacher')}>כניסת מורה</button>
      </div>
    </>
  )
}

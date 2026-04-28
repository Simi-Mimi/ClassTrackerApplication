
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => navigate('/signup-student')}>לרישום כתלמיד</button>
        <button onClick={() => navigate('/signup-teacher')}>לרישום כמורה</button>
        <button onClick={() => navigate('/addClass')}>הוספה ומחיקת כיתה</button>
      </div>
    </>
  )
}


import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const AdminArea = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
      const adminData = sessionStorage.getItem("user");
      console.log("Data in storage:", adminData);
      if (adminData) {
          const user = JSON.parse(adminData);
          if (user.role === "SCHOOL_MANAGER") {
              setIsAuthorized(true);
          } else {
              navigate('/teacher-area'); 
          }
      } else {
          navigate('/');
      }
  }, [navigate]);

  if (!isAuthorized) {
    return null;
}
  return (
    <>
      <div>
        <button onClick={() => navigate('/signup-student')}> הוספת תלמיד</button>
        <button onClick={() => navigate('/signup-teacher')}> הוספת מורה</button>
        <button onClick={() => navigate('/add-class')}>הוספת כיתה</button>
      </div>
    </>
  )
}

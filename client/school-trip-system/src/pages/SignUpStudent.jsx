
import React, { useState } from "react";
import {registerUser} from '../services/apiService'

export const SignUpStudent = () => {

    const [formData, setFormData] = useState({
      id: '',
      firstName: '',
      lastName: '',
      classroom: ''
    });
    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await registerUser(formData, 'student');
      console.log("handleSubmit")
      if (result) {
        console.log("Response from server:", result);
    }

    }
  return (
    <>
    <form onSubmit={(e) => { handleSubmit(e);}}>
    <div>SignUpTeacer</div>
    <input placeholder="שם פרטי" 
    onChange={e => setFormData({...formData, firstName: e.target.value})} />
    <input placeholder="שם משפחה" 
    onChange={e => setFormData({...formData, lastName: e.target.value})} />
    <input placeholder="מספר תעודת זהות" 
    onChange={e => setFormData({...formData, id: e.target.value})} />
    <input placeholder="כיתה" 
    onChange={e => setFormData({...formData, classroom: e.target.value})} />
    <button type="submit" >שלח רישום</button>
    </form>
    </>
  );
};


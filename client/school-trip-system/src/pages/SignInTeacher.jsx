import React, { useState } from "react";
import {IsTeacher} from '../services/apiService'
import { useNavigate } from 'react-router-dom';

export const SignInTeacher = () => {
        const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await IsTeacher(formData);
        console.log(result)
        if (result) {
            navigate('/list-student', { state: { teacher: result } });
            console.log("Response from server:", result);
        }
    }
    return (
        <>
            <div>SignInTeacher</div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='הכנס תעודת זהות'
                    value={formData.id}
                    onChange={e => setFormData({ ...formData, id: e.target.value })}
                />
                <button type="submit">היכנס</button>
            </form>
        </>

    )
}


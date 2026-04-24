
import { useLocation } from 'react-router-dom';
import { ListStudent } from '../services/apiService'
import React, { useEffect, useState } from 'react';

export const PersonalArea = () => {

    const location = useLocation();
    const teacher = location.state?.teacher;
    const [students, setStudents] = useState([]);
    const teacherId = teacher.id;
    console.log(teacher)

    useEffect(() => {
        const getStudentList = async () => {
            if (!teacher?.id) {
                return;
            }
            try {
                const result = await ListStudent(teacher.id);
                setStudents(result);
                console.log("רשימת תלמידות:", result);
            } catch (error) {
                console.error(error);
            }
        };
        getStudentList();
    }, [teacher?.id]);
    return (
        <>
            <div>ListStudent</div>
            {teacher ? (
                <div>
                    <h3>פרטי המורה:</h3>
                    <p>שם: {teacher.firstName + " " + teacher.lastName}</p>
                    <p>כיתה: {teacher.classroom}</p>
                    <p>=====================================</p>
                </div>
            ) : (
                <p>לא נמצאו נתוני מורה</p>
            )}
            <h1>רשימת התלמידות שלי</h1>
            <ul>
                {students.map((result) => (
                    <li
                        key={result.id}
                    >
                        <p>שם: {result.firstName + " " + result.lastName}</p>
                        <p>ת.ז.: {result.id }</p>
                        <p>כיתה: {result.classroom }</p>
                        <p>+++++++++++++++++++</p>
                    </li>
                ))}
            </ul>
        </>

    )
}


import { useLocation } from 'react-router-dom';
import { ListStudent,LocationStudents } from '../services/apiService'
import React, { useEffect, useState } from 'react';
import Map from '../components/Map';

export const PersonalArea = (Props) => {
    const location = useLocation();
    const teacher = location.state?.teacher;

    const [students, setStudents] = useState([]);
    const [locations, setLocations] = useState([]);
    // const teacherId = teacher.id;

    useEffect(() => {
        const getStudentLists = async (Props) => {
            if (!teacher?.id) {
                return;
            }
            try {
                const studentList = await ListStudent(teacher.id);
                setStudents(studentList);

                const studentLocations = await LocationStudents(teacher.id);
                setLocations(studentLocations || []);

            } catch (error) {
                console.error(error);
            }
        };
        getStudentLists();

        const interval = setInterval(async () => {
            const freshLocations = await LocationStudents(teacher.id);
            if (freshLocations) setLocations(freshLocations);
        }, 60000);

        return () => clearInterval(interval);
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
                {students.map((studentList) => (
                    <li
                        key={studentList.id}
                    >
                        <p>שם: {studentList.firstName + " " + studentList.lastName}</p>
                        <p>ת.ז.: {studentList.id}</p>
                        <p>כיתה: {studentList.classroom}</p>
                        <p>+++++++++++++++++++</p>
                    </li>
                ))}
            </ul>
            <h1>היכן התלמידות עכשיו</h1>
            <Map studentsLocations={locations} />
        </>

    )
}

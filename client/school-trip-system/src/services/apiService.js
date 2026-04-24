const API_URL = 'http://localhost:8080/api';
//רישום מורה ותלמיד
export const registerUser = async (userData, type) => {
    console.log(userData, type)
    if (type == 'student') {
        const response = await fetch(`${API_URL}/addStudent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return response.json();
    } else {
        const response = await fetch(`${API_URL}/addTeacher`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return response.json();
    }
};
//בדיקה האם זה מורה
export const IsTeacher = async (IdData) => {
    const teacherId = IdData.id; 
    const response = await fetch(`${API_URL}/teacher`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Teacher-ID': teacherId
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        alert("הנתון אינו תקין או שאינו קיים במערכת")
        return null;
    }
};

//רשימת התלמדות
export const ListStudent = async (IdData) => {
    console.log("IdData ListStudentListStudent",IdData)
    const response = await fetch(`${API_URL}/students/class`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Teacher-ID': IdData
        }
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        return await data;
    } else {
        alert("הנתון אינו תקין או שאינו במערכת")
        return null;
    }
};
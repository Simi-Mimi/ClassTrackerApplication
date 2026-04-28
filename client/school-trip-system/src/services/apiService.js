
const API_URL = "http://localhost:8080/api";
//רישום מורה ותלמיד
export const registerUser = async (userData, type) => {
  console.log(userData, type);
  try {
    let response;
    if (type == "student") {
         response = await fetch(`${API_URL}/addStudent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
    } else {
         response = await fetch(`${API_URL}/addTeacher`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
    }
        return response.json();
  } catch (error) {
    throw error;
    }
};
//בדיקה האם זה מורה
export const IsTeacher = async (IdData) => {
  try {
    const teacherId = IdData.id;
    const response = await fetch(`${API_URL}/teacher`, {
      method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Teacher-ID": teacherId,
      },
    });
    if (response.ok) return await response.json();
  } catch (error) {
    throw error;
    }
};

//רשימת התלמידים
export const ListStudent = async (IdData) => {
  console.log("IdData ListStudentListStudent", IdData);
    const response = await fetch(`${API_URL}/students/class`, {
    method: "GET",
        headers: {
      "Content-Type": "application/json",
      "Teacher-ID": IdData,
    },
    });
    if (response.ok) {
        const data = await response.json();
    console.log(data);
        return data;
    } else {
    alert("הנתון אינו תקין או שאינו במערכת");
        return null;
    }
};
//רשימת מיקומי התלמידים
export const LocationStudents = async (IdData) => {
    const response = await fetch(`${API_URL}/allLocation`, {
    method: "GET",
        headers: {
      "Content-Type": "application/json",
      "Teacher-ID": IdData,
    },
    });
    if (response.ok) {
        const data = await response.json();
    console.log(data);
        return data;
    } else {
    alert("הנתון אינו תקין או שאינו במערכת");
        return null;
    }
};
//שליפת הכיתות
export const getAllClassrooms = async () => {
  const response = await fetch(`${API_URL}/classrooms`);
  return await response.json(); 
};
//הוספת כיתה
export const addClass = async (data) => {
  const response = await fetch(`${API_URL}/addClass`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});
if (!response.ok) {
  const errorMsg = await response.text();
  throw new Error(errorMsg || 'שגיאה בשמירת הכיתה');
}
return await response.json();
};
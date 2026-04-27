// import { useLocation } from "react-router-dom";
// import { ListStudent, LocationStudents } from "../services/apiService";
// import React, { useEffect, useState } from "react";
// import Map from "../components/Map";

// export const PersonalArea = (Props) => {
//   const location = useLocation();
//   const teacher = location.state?.teacher;
//   const [students, setStudents] = useState([]);
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     const getStudentLists = async (Props) => {
//       if (!teacher?.id) {
//         return;
//       }
//       try {
//         const studentList = await ListStudent(teacher.id); // שולף לי רשימת תלמידים לפי מורה
//         setStudents(studentList);

//         const studentLocations = await LocationStudents(teacher.id);
//         setLocations(studentLocations || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getStudentLists();

//     const interval = setInterval(async () => {
//       const freshLocations = await LocationStudents(teacher.id);
//       if (freshLocations) setLocations(freshLocations);
//     }, 60000);
//     return () => clearInterval(interval);
//   }, [teacher?.id]);
//   const teacherPos = locations.find(
//     (loc) => String(loc.id) === String(teacher.id)
//   );
//   const studentsOnlyPos = locations.filter(
//     (loc) => String(loc.id) !== String(teacher.id)
//   );
//   return (
//     <>
//       {teacher ? (
//         <div>
//           <h2>פרטי המורה:</h2>
//           <p>שם: {teacher.firstName + " " + teacher.lastName}</p>
//           <p>כיתה: {teacher.classroom}</p>
//         </div>
//       ) : (
//         <p>לא נמצאו נתוני מורה</p>
//       )}
//       <h1>רשימת התלמידות שלי</h1>
//       <ul>
//         {students.map((studentList) => (
//           <li key={studentList.id}>
//             <p>שם: {studentList.firstName + " " + studentList.lastName}</p>
//             <p>ת.ז.: {studentList.id}</p>
//             <p>כיתה: {studentList.classroom}</p>
//           </li>
//         ))}
//       </ul>
//       <h1>היכן התלמידות עכשיו?</h1>
//       <Map 
//     //   studentsLocations={studentsOnlyPos}
//        teacherLocation={teacherPos}
//        studentsLocations={studentsOnlyPos.map(loc => {
//         // מחפשים את פרטי התלמידה ברשימת הסטודנטים לפי ה-ID
//         const studentInfo = students.find(s => String(s.id) === String(loc.id));
//         return {
//             ...loc,
//             firstName: studentInfo ? studentInfo.firstName : "תלמידה",
//             lastName: studentInfo ? studentInfo.lastName : "לא ידוע"
//         };
//     })}
//         />
//         <br></br>
//     </>
//   );
// };
import { useLocation } from "react-router-dom";
import { ListStudent, LocationStudents } from "../services/apiService";
import React, { useEffect, useState } from "react";
import Map from "../components/Map";

export const PersonalArea = (Props) => {
  const location = useLocation();
  const teacher = location.state?.teacher;
  const [students, setStudents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getStudentLists = async () => {
      if (!teacher?.id) return;
      
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

  // מציאת מיקום המורה והזרקת השם שלו
  const teacherPosRaw = locations.find(
    (loc) => String(loc.id) === String(teacher?.id)
  );
  
  const teacherLocationWithNames = teacherPosRaw ? {
    ...teacherPosRaw,
    firstName: teacher.firstName,
    lastName: teacher.lastName
  } : null;

  // סינון מיקומי תלמידות והזרקת שמותיהן
  const studentsOnlyPos = locations.filter(
    (loc) => String(loc.id) !== String(teacher?.id)
  );

  const enrichedStudentLocations = studentsOnlyPos.map(loc => {
    const studentInfo = students.find(s => String(s.id) === String(loc.id));
    return {
      ...loc,
      firstName: studentInfo ? studentInfo.firstName : "תלמידה",
      lastName: studentInfo ? studentInfo.lastName : "" // שם משפחה
    };
  });

  return (
    <>
      {teacher ? (
        <div>
          <h2>פרטי המורה:</h2>
          <p>שם: {teacher.firstName + " " + teacher.lastName}</p>
          <p>כיתה: {teacher.classroom}</p>
        </div>
      ) : (
        <p>לא נמצאו נתוני מורה</p>
      )}

      <h1>רשימת התלמידות שלי</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <p>שם: {student.firstName + " " + student.lastName}</p>
            <p>ת.ז.: {student.id}</p>
            <p>כיתה: {student.classroom}</p>
          </li>
        ))}
      </ul>

      <h1>היכן התלמידות עכשיו?</h1>
      <Map 
        teacherLocation={teacherLocationWithNames}
        studentsLocations={enrichedStudentLocations}
      />
    </>
  );
};
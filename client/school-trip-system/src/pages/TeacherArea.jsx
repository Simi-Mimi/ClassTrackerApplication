import { useLocation, useNavigate } from "react-router-dom";
import { ListStudent, LocationStudents } from "../services/apiService";
import React, { useEffect, useState } from "react";
import Map from "../components/Map";

// מחשב את המרחק בין המורה לתלמידה
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const TeacherArea = (Props) => {
  const [view, setView] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [teacher, setTeacher] = useState(() => {
    const stateTeacher = location.state?.teacher;
    if (stateTeacher) {
      sessionStorage.setItem("teacher", JSON.stringify(stateTeacher));
      return stateTeacher;
    }
    const savedTeacher = sessionStorage.getItem("teacher");
    return savedTeacher ? JSON.parse(savedTeacher) : null;
  });
  const [students, setStudents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!teacher?.id) {
      navigate("/signup-teacher");
      return;
    }
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
  }, [teacher?.id, navigate]);

  const teacherPosRaw = locations.find(
    (loc) => String(loc.id) === String(teacher?.id)
  );

  const teacherLocationWithNames = teacherPosRaw
    ? {
        ...teacherPosRaw,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
      }
    : null;

  const studentsOnlyPos = locations.filter(
    (loc) => String(loc.id) !== String(teacher?.id)
  );

  const enrichedStudentLocations = studentsOnlyPos.map((loc) => {
    const studentInfo = students.find((s) => String(s.id) === String(loc.id));
    return {
      ...loc,
      firstName: studentInfo ? studentInfo.firstName : "תלמידה",
      lastName: studentInfo ? studentInfo.lastName : "",
    };
  });

  return (
    <>
      {teacher ? (
        <div>
          <h2>פרטי המורה:</h2>
          <p>שם: {teacher.firstName + " " + teacher.lastName}</p>
          <p>כיתה: {teacher.classroom?.name}</p>
        </div>
      ) : (
        <p>לא נמצאו נתוני מורה</p>
      )}
      <button onClick={() => setView("list")}>📋 רשימת התלמידות שלי</button>
      <button onClick={() => setView("map")}>🔎 פתיחת מפה מלאה</button>

      {view === "list" && (
        <>
          <h1>רשימת התלמידות שלי</h1>
          <ul>
            {students.map((student) => {
              const studentPos = locations.find(
                (loc) => String(loc.id) === String(student.id)
              );

              let isFar = false;
              // חישוב מרחק אם יש מיקום למורה ולתלמידה
              if (studentPos && teacherLocationWithNames) {
                const dist = getDistance(
                  teacherLocationWithNames.latitude,
                  teacherLocationWithNames.longitude,
                  studentPos.latitude,
                  studentPos.longitude
                );
                console.log(studentPos.lng+" studentPos.lng");
                if (dist > 3) isFar = true; 
              }
              return (
                <li
                  key={student.id}
                  onClick={() => {
                    if (studentPos) {
                      setSelectedLocation([studentPos.lat, studentPos.lng]);
                      setView("map");
                    } else {
                      alert("לא נמצא מיקום עבור תלמידה זו");
                    }
                  }}
                >
                  <p>
                    <strong>
                      שם: {student.firstName + " " + student.lastName}<br></br>
                      {isFar && <span style={{ color: "red", marginRight: "10px" }}>⚠️ רחוק מהקבוצה!</span>}
                    </strong>
                  </p>
                  <p>ת.ז.: {student.id}</p>
                  <hr />
                </li>
              );
            })}
          </ul>
        </>
      )}

      {view === "map" && (
        <>
          <h1>היכן התלמידות עכשיו?</h1>
          <div style={{ height: "500px", width: "100%" }}>
            <Map
              teacherLocation={teacherLocationWithNames}
              studentsLocations={enrichedStudentLocations}
            />
          </div>
        </>
      )}
    </>
  );
};

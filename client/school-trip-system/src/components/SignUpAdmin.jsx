
import React, { useState,useEffect } from "react";
import { registerUser,getAllClassrooms  } from "../services/apiService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    firstName: yup.string().required("חובה להזין שם פרטי").min(2, "שם קצר מדי"),
    lastName: yup
      .string()
      .required("חובה להזין שם משפחה")
      .min(2, "שם משפחה קצר מדי"),
    id: yup
      .string()
      .required("חובה להזין תעודת זהות")
      .matches(/^[0-9]+$/, "תעודת זהות חייבת להכיל ספרות בלבד")
      .length(9, "תעודת זהות חייבת להיות בדיוק 9 ספרות"),
       classroom: yup.object({
         id: yup.string().required("חובה לבחור כיתה"),
       }),
  })
  .required();

export const SignUpAdmin = () => {
      const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState({ show: false, mess: "", type: "" });
  const [serverError, setServerError] = useState("");
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClassrooms();
        setClassrooms(data);
      } catch (err) {
        console.error("נכשל בטעינת כיתות", err);
      }
    };
    fetchClasses();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
    const [classrooms, setClassrooms] = useState([]);
        useEffect(() => {
          const adminData = sessionStorage.getItem("user");
          console.log("Data in storage:", adminData);

          if (adminData) {
              const user = JSON.parse(adminData);
              if (user.role === "SCHOOL_MANAGER") {
                  setIsAuthorized(true);
              } else {
                  navigate('/admin-area'); 
              }
          } else {
              navigate('/');
          }
      }, [navigate]);
      if (!isAuthorized) {
        return null;
    }

  const showMsg = (txt) => {
    setMessage({ show: true, mess: txt });
    setTimeout(() => setMessage({ show: false, mess: "" }), 3000);
  };
  const onSubmit = async (formData) => {
    setServerError("");
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);
    const adminId = user.id

    try{  
    const result = await registerUser(formData, "teacher",adminId);
    console.log("handleSubmit");
      showMsg("הרישום בוצע בהצלחה! המנהל נוספה למערכת");
      navigate("/teacher-area", { state: { teacher: result } });
      reset();
    }catch(errors){
      setServerError(errors.message || "אירעה שגיאה ברישום מנהל");
    }
  }

  return (
    <>
      {message.show && <div>{message.mess}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>רישום מורה</h2>
        <div>
          {serverError && (
            <p className="error-msg" style={{ color: "red" }}>
              {serverError}
            </p>
          )}
          <input type="text" placeholder="שם פרטי" {...register("firstName")} />
          {errors.firstName && (
            <span className="error">{errors.firstName.message}</span>
          )}
          <input type="text" placeholder="שם משפחה" {...register("lastName")} />
          {errors.lastName && (
            <span className="error">{errors.lastName.message}</span>
          )}
          <input
            type="text"
            placeholder="מספר תעודת זהות"
            {...register("id")}
            onInput={() => setServerError("")}
          />
          {errors.id && <span className="error">{errors.id.message}</span>}
          <select {...register("classroom.id")} className="form-select" onChange={(e) => e.target.style.color = e.target.value ? "#333" : "#757575"}
  style={{ color: "#757575" }}>
            <option value="">בחרי כיתה...</option>
            {classrooms.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} 
              </option>
            ))}
          </select>
          {errors.classroom && (
            <span className="error">{errors.classroom.message}</span>
          )}
          <input type="submit" value="הירשם" />
        </div>
      </form>
    </>
  );
};

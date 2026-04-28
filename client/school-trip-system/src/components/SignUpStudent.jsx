import React, { useState, useEffect } from "react";
import { registerUser, getAllClassrooms } from "../services/apiService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

export const SignUpStudent = () => {
  const [message, setMessage] = useState({ show: false, mess: "", type: "" });
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [classrooms, setClassrooms] = useState([]);
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
  const showMsg = (txt) => {
    setMessage({ show: true, mess: txt });
    setTimeout(() => setMessage({ show: false, mess: "" }), 3000);
  };
  const onSubmit = async (formData) => {
    setServerError("");
    try {
      const result = await registerUser(formData, "student");
      if (result) {
        showMsg("הרישום בוצע בהצלחה! התלמידה נוספה למערכת");
        reset();
      } 
    }catch(error){
      setServerError(error.message || "משהו השתבש, אנא בדוק את הנתונים");
    }
  }

  return (
    <>
      {message.show && (
        <div className="notification-card success">{message.mess}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2> רישום תלמידה חדשה</h2>
        {serverError && (
          <p className="error-msg" style={{ color: "red" }}>
            {serverError}
          </p>
        )}
        <div>
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

          <select {...register("classroom.id")} className="form-select"onChange={(e) => e.target.style.color = e.target.value ? "#333" : "#757575"}
  style={{ color: "#757575" }} >
            <option value="">בחר כיתה...</option>
            {classrooms.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
          {errors.classroom?.id && (
            <span className="error">{errors.classroom.id.message}</span>
          )}
          <input type="submit" value="הירשם" />
        </div>
      </form>
    </>
  );
};

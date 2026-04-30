import React, { useState } from "react";
import { registerAdmin } from "../services/apiService";
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
  })
  .required();

export const SignUpAdmin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ show: false, mess: "", type: "" });
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const showMsg = (txt) => {
    setMessage({ show: true, mess: txt });
    setTimeout(() => setMessage({ show: false, mess: "" }), 3000);
  };
  const onSubmit = async (formData) => {
    setServerError("");
    try {
      const result = await registerAdmin(formData);
      console.log("handleSubmit");
      showMsg("הרישום בוצע בהצלחה! מנהל נקבע למערכת");
      sessionStorage.setItem("user", JSON.stringify(result));
      setTimeout(() => {
        navigate("/admin-area", { state: { teacher: result } });
    }, 2000);
    } catch (err) {
      setServerError(err.message || "אירעה שגיאה ברישום מנהל");
    }
  };

  return (
    <>
      {message.show && <div>{message.mess}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2> רישום מנהל</h2>
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
          <input type="submit" value="הירשם" />
        </div>
      </form>
    </>
  );
};

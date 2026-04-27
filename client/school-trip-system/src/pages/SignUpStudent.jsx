
import React, { useState } from "react";
import { registerUser } from "../services/apiService";

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
    classroom: yup.string().required("חובה להזין כיתה"),
  })
  .required();

export const SignUpStudent = () => {
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
  const onSubmit = async (data) => {
    setServerError("");
    const result = await registerUser(formData, "student");
      if (result) {
      showMsg("הרישום בוצע בהצלחה! התלמידה נוספה למערכת");
      reset();
    } else {
      setServerError("תלמיד לא נמצא במערכת, אנא בדוק את הנתונים");
      showMsg("משהו השתבש", "error");
    }
  };
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
          <input type="text" placeholder="כיתה" {...register("classroom")} />
          {errors.classroom && (
            <span className="error">{errors.classroom.message}</span>
          )}
          <input type="submit" value="הירשם" />
        </div>
    </form>
    </>
  );
};

import React, { useState } from "react";
import { IsAdmin, IsTeacher } from "../services/apiService";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    id: yup
      .string()
      .required("חובה להזין תעודת זהות")
      .matches(/^[0-9]+$/, "תעודת זהות חייבת להכיל ספרות בלבד")
      .min(9, "תעודת זהות קצרה מדי")
      .max(9, "תעודת זהות ארוכה מדי"),
  })
  .required();

export const SignInAdmin = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      setServerError("");
      const result = await IsAdmin(data);
      if (result) {
        sessionStorage.setItem("user", JSON.stringify(result));
        navigate("/admin-area", { state: { teacher: result } });
      } else {
        setServerError("מנהל לא נמצא במערכת");
      }
    } catch (error) {
      setServerError("אירעה שגיאה בחיבור לשרת");
    }
  };
  return (
    <>
      <div className="signin-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>כניסת מנהל מערכת</h2>
          {serverError && (
            <div className="login-info-section">
              <p className="info-text">{serverError+"- "}
                <span
                  className="signup-link"
                  onClick={() => navigate("/signup-teacher")}
                >
                  לחצי כאן להרשמה👉
                </span>
              </p>
            </div>
          )}
          <label htmlFor="id-input">תעודת זהות:</label>
          <input
            id="id-input"
            type="text"
            placeholder="הכנס תעודת זהות"
            {...register("id")}
            onInput={() => setServerError("")}
          />
          {errors.id && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.id.message}
            </p>
          )}
          <input type="submit" value="היכנס" />
        </form>
      </div>
    </>
  );
};

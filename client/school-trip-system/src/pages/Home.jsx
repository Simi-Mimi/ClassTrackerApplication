import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  console.log();
  return (
    <>
      <div>
        <button
          onClick={() => {
            const user = JSON.parse(sessionStorage.getItem("user") || "null");
            navigate(
              user?.role === "SCHOOL_MANAGER"
                ? "/admin-area"
                : "/signin-signup-admin"
            );
          }}
        >
          כניסת מנהל
        </button>
        <button
          onClick={() => {
            const user = JSON.parse(sessionStorage.getItem("user") || "null");
            navigate(
              user?.role === "TEACHER" || user?.role === "SCHOOL_MANAGER"
                ? "/teacher-area"
                : "/signin-teacher"
            );
          }}
        >
          כניסת מורה
        </button>
      </div>
    </>
  );
};

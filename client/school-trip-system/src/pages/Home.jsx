import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
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
        {/* <button onClick={() => navigate("/signin-signup-admin")}>
          כניסת מנהל
        </button> */}
        <button onClick={() => navigate("/signin-teacher")}>כניסת מורה</button>
      </div>
    </>
  );
};

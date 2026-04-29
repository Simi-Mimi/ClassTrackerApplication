import React, { useEffect, useState } from "react";
import { checkAdminStatus } from "../services/apiService";
import { SignInAdmin } from "./SignInAdmin";

export const SignInSignUpAdmin = () => {
  const [view, setView] = useState("");
  useEffect(() => {
    const fetchStatus = async () => {
      const hasAdmin = await checkAdminStatus();
      if (hasAdmin) {
        setView("signin");
      } else {
        setView("signup");
      }
    };
    fetchStatus();
  }, []);

  return (
    <>

      {view === "loading" && <div>בודק נתונים...</div>}

      {view === "signup" && (
        <>
          <h1>רישום מנהל</h1>
        </>
      )}

      {view === "signin" && (
        <>
          <SignInAdmin />
        </>
      )}
    </>
  );
};

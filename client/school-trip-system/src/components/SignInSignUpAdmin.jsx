import React, { useEffect, useState } from "react";
import { checkAdminStatus } from "../services/apiService";
import { SignInAdmin } from "./SignInAdmin";
import { SignUpAdmin } from "./SignUpAdmin";

export const SignInSignUpAdmin = () => {
  const [view, setView] = useState("");
  useEffect(() => {
    const fetchStatus = async () => {
      const hasAdmin = await checkAdminStatus();
      console.log(hasAdmin+" hasAdmin")
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
          <SignUpAdmin />
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

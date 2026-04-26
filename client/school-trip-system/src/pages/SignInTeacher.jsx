// import React, { useState } from "react";
// import { IsTeacher } from "../services/apiService";
// import { useNavigate } from "react-router-dom";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup
//   .object({
//     id: yup
//       .string()
//       .required("חובה להזין תעודת זהות")
//       .matches(/^[0-9]+$/, "תעודת זהות חייבת להכיל ספרות בלבד")
//       .min(9, "תעודת זהות קצרה מדי")
//       .max(9, "תעודת זהות ארוכה מדי"),
//   })
//   .required();

// export const SignInTeacher = () => {
//   const [serverError, setServerError] = useState("");
//         const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     });
//   const onSubmit = async (data) => {
//     try {
//       setServerError("");
//       const result = await IsTeacher(data);
//         if (result) {
//         navigate("/list-student", { state: { teacher: result } });
//         // console.log("Response from server:", result);
//       } else {
//         setServerError("מורה לא נמצא במערכת, אנא בדוק את הנתונים");
//       }
//     } catch (error) {
//       setServerError("אירעה שגיאה בחיבור לשרת");
//     }
//   };
//     return (
//         <>
//       <div className="signin-container">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <h2>כניסת מורה</h2>
//           {serverError && <div>{serverError}</div>}
//           <label htmlFor="id-input">תעודת זהות:</label>
//                 <input
//             id="id-input"
//             type="text"
//             placeholder="הכנס תעודת זהות"
//             {...register("id")}
//             onInput={() => setServerError("")}
//           />
//           {errors.id && (
//             <p style={{ color: "red", fontSize: "14px" }}>
//               {errors.id.message}
//             </p>
//           )}
//           <input type="submit" value="היכנס" />
//             </form>
//       </div>
//     </>
//   );
// };
import React, { useState } from "react";
import { IsTeacher } from "../services/apiService";
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

export const SignInTeacher = () => {
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
      const result = await IsTeacher(data);
        if (result) {
        navigate("/list-student", { state: { teacher: result } });
        // console.log("Response from server:", result);
      } else {
        setServerError("מורה לא נמצא במערכת, אנא בדוק את הנתונים");
      }
    } catch (error) {
      setServerError("אירעה שגיאה בחיבור לשרת");
    }
  };
    return (
        <>
      <div className="signin-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>כניסת מורה</h2>
          {serverError && <div>{serverError}</div>}
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

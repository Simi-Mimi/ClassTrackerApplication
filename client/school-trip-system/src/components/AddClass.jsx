import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addClass } from "../services/apiService";
export const AddClass = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState({ show: false, text: "" });
  const showMsg = (txt) => {
    setMessage({ show: true, text: txt });
    // setTimeout(() => setMessage({ show: false, text: "" }), 3000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const classRegex = /^[א-ת]\/[0-9]+$/;
    if (!classRegex.test(className)) {
      setError("יש להזין פורמט תקין, לדוגמה: א/1");
      return;
    }
    try {
      const newClass = {
        name: className,
      };

      await addClass(newClass);
      showMsg("הכיתה נוספה למערכת");
      setClassName("");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div style={{ padding: "20px", direction: "rtl" }}>
        <h3>הוספת כיתה חדשה</h3>
        {message.show && (
          <div>
            <span>{message.text} 
            </span>
            <span className="signup-link" onClick={() => navigate("/admin")}>
              לחצי כאן לחזרה לדף מנהל 👉
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>שם הכיתה (פורמט א/1): </label>
          <input
            type="text"
            value={className}
            placeholder="לדוגמה: ב/3"
            onChange={(e) => setClassName(e.target.value)}
          />
          <button type="submit">שמירה</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

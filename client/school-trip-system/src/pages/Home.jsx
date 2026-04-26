// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// // clg
// // rafce
// export const Home = () => {
//     const navigate = useNavigate();
//   return (
//     <>
//       <div>
//         <button onClick={() => navigate('/signup-student')}>לרישום כתלמיד</button>
//         <button onClick={() => navigate('/signup-teacher')}>לרישום כמורה</button>
//         <button onClick={() => navigate('/signin-teacher')}>כניסת מורה</button>
//       </div>
//     </>
//   )
// }
import React from 'react'
import { useNavigate } from 'react-router-dom';

// clg
// rafce
export const Home = () => {
    const navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => navigate('/signup-student')}>לרישום כתלמיד</button>
        <button onClick={() => navigate('/signup-teacher')}>לרישום כמורה</button>
        <button onClick={() => navigate('/signin-teacher')}>כניסת מורה</button>
      </div>
    </>
  )
}

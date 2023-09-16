import React from "react";
import {  useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate()
  const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <>
      <div style={style}>
        <h1 style={{ marginBlock: "20px" }}>404 - Page Not Found</h1>
        <p>The page you are looking for might have been removed </p>
        <p>had its name changed or is temporarily unavailable.</p>
       <button onClick={()=>navigate("/dashboard")} style={{marginBlock:"20px"}}>Back To Home</button>
      </div>
    </>
  );
};

export default PageNotFound;

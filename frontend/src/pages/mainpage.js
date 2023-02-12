import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./dashboard.js";

function Mainpage({userToken,setUserToken}){


  return (
    <Dashboard  
      userToken={userToken}
      setUserToken={setUserToken}
    />
  );
}

export default Mainpage;

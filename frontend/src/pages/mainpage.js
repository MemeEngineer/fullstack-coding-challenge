import React from "react";
// import { BrowserRouter as Router} from "react-router-dom";
import Dashboard from "./dashboard.js";
import Header from "./header.js";

function Mainpage({userToken,setUserToken}){


  return (
    <div>
      <Header/>
      <Dashboard  
      userToken={userToken}
      setUserToken={setUserToken}
      />
    </div>
  );
}

export default Mainpage;

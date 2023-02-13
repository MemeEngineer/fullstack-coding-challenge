import React from "react";
// import { BrowserRouter as Router} from "react-router-dom";
import Dashboard from "./dashboard.js";
import Header from "./header.js";
import Footer from "./footer.js";

function Mainpage({userToken,setUserToken, islogin, setLogin}){


  return (
    <div>
      <Header/>
      <Dashboard  
      userToken={userToken}
      setUserToken={setUserToken}
      islogin={islogin} 
      setLogin={setLogin}
      />
      <Footer/>
    </div>
  );
}

export default Mainpage;

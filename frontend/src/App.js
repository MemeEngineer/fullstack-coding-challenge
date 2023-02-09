import React, {useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Loginform from "./forms/loginform.js";
// import Dashboard from './pages/dashboard.js';
import Mainpage from "./pages/mainpage.js";

function App() {
  // const[isLoggedin, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  

  return (
    <div>
      {userToken ? (
        <Mainpage
          setUserToken={setUserToken}
          userToken={userToken}
        />
      ) : (
        <Loginform setUserToken={setUserToken} />
      )}
    </div>
  );
}

export default App;

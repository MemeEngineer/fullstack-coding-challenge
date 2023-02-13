import React, {useState} from "react";
import "./App.css";
import Loginform from "./forms/loginform.js";
import Mainpage from "./pages/mainpage.js";

function App() {
  const [userToken, setUserToken] = useState({});
  const [islogin, setLogin]       = useState(false);
  
  return (
    <div>
      {islogin ? (
        <Mainpage
          setUserToken={setUserToken}
          userToken={userToken}
          islogin={islogin} 
          setLogin={setLogin}
        />
      ) : (
        <Loginform setUserToken={setUserToken}userToken={userToken} islogin={islogin} setLogin={setLogin}/>
      )}
    </div>

    
  );
}

export default App;

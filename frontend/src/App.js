import React, {useState} from "react";
import "./App.css";
import Loginform from "./forms/loginform.js";
import Mainpage from "./pages/mainpage.js";

function App() {
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

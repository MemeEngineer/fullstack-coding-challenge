import React, {useState} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Loginform from './forms/loginform.js';
import Dashboard from './pages/dashboard.js';

function App() {
  // const[isLoggedin, setIsLoggedIn] = useState(false);
  const[userToken, setUserToken] = useState(null)
  


  return (
    <div>
      <Router>
      {userToken ? <Dashboard/> : <Loginform  setUserToken={setUserToken}/>}
      </Router>
    </div>
  );
}


export default App;

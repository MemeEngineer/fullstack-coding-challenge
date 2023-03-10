import React, {useState} from "react";
import NYCClogo from "../assets/nycc-wordmark-blue.png";
import "./loginform.css";


function LoginForm({userToken,setUserToken, islogin, setLogin}) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

 const [errorMessage, setErrorMessage] = useState("");
    

      const handleChange = (e) => {
        
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
                                        
      function handleSubmit(e) {
        e.preventDefault();

         const userCreds = { ...formData };
    
        fetch("http://127.0.0.1:8000/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  
          },
          body: JSON.stringify(userCreds),
        })
          .then((response) => {
            if(response.ok){
            return response.json();
            }else{
              setErrorMessage("Username or Password Invalid!")
              Promise.reject(response)
             }
            }
          )
          .then((user) => {
            // checks output of response (user token)
            // console.log(user);
            setFormData({
              username: "",
              password: "",
            })
            setUserToken(user.token)
            setLogin(true)
          })
         .catch((response)=> {console.log("Username or Password Invalid!")})
      }
      

  return (
    <div className="center-screen">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={NYCClogo} alt="New York City Council Logo"></img>
        <form onSubmit={(e)=>handleSubmit(e)}>
             <div style={{color:"red", fontWeight:"bold"}}>{errorMessage}</div> 
          <label>Username</label>
          <input
            id="username-input"
            type="text"
            name="username"
            placeholder="Input Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            id="password-input"
            type="password"
            name="password"
            placeholder="Input Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login"> Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

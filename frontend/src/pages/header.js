import React from "react";
// import NYCflag from "../assets/nycflag.svg";
import NYCC from "../assets/nycc-wordmark-blue.png"

function header(){
    return(
        <div style={{display:'flex',width:"100%", height:"200px", marginTop: "10px"}}>
        <img src={NYCC} alt="NYC flag" style={{display: "flex", width: "100%",height: "auto",backgroundSize: "cover",backgroundRepeat: "no-repeat",backgroundPosition: "center"}}/>
        </div>
    
    )
};

export default header;

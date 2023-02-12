import React from "react";
import NYCflag from "../assets/nycflag.svg";

function header(){
    return(
        <div style={{display:'flex',width:"100%", height:"200px"}}>
        <img src={NYCflag} alt="NYC flag" style={{display: "flex", width: "100%",height: "auto",backgroundSize: "cover",backgroundRepeat: "no-repeat",backgroundPosition: "center"}}/>
        </div>
    
    )
};

export default header;

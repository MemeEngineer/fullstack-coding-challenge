import React, {useEffect, useState} from "react";


function Dashboard( {userToken,setUserToken}){
 const [userComplaints, setUserComplaints]= useState([])

useEffect(() => {
  fetch('http://127.0.0.1:8000/api/complaints/', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${userToken}`,  
    },
  })
    .then((response) => response.json())
    .then((complaints) => {
      // checks output of response (user complaints)
      //console.log(complaints);
      setUserComplaints(
        complaints
      )
    });
}, [userToken]);
  
    
console.log(userComplaints)

    return(
    <div>
{userComplaints.map((complaint) =>{ return(
  <div key={complaint.uniquekey}>
  <p>{complaint.account}</p>
  </div>
  // {complaint.borough}
  // {complaint.city}
  // {complaint.closedate}
  // {complaint.community_board}
  // {complaint.complaint_type}
  // {complaint.council_dist}
  // {complaint.descriptor}
  // {complaint.opendate}
  // {complaint.uniquekey}
  // {complaint.zip}
)}
)}
</div>
    )
};

export default Dashboard;
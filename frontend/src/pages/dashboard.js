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
<table key={userComplaints.uniquekey}>
<tr>
    <th>Account</th>
    <th>Borough</th>
    <th>City</th>
    <th>Close Date</th>
    <th>Community Board</th>
    <th>Complaint Type</th>
    <th>Council District</th>
    <th>Descriptor</th>
    <th>Open Date</th>
    <th>UniqueKey</th>
    <th>Zip Code</th>
  </tr>
{userComplaints.map((complaint) =>{ return(

  <tr>
  <td>{complaint.account}</td>
  <td>{complaint.borough}</td>
  <td>{complaint.city}</td>
  <td>{complaint.closedate}</td>
  <td>{complaint.community_board}</td>
  <td>{complaint.complaint_type}</td>
  <td>{complaint.council_dist}</td>
  <td>{complaint.descriptor}</td>
  <td>{complaint.opendate}</td>
  <td>{complaint.uniquekey}</td>
  <td>{complaint.zip}</td>
  </tr>
)})}
</table>
</div>
)
};

export default Dashboard;
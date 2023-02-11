import React, { useEffect, useState } from "react";

function Dashboard({ userToken, setUserToken }) {
  const [userComplaints, setUserComplaints] = useState([]);
  const [openCases, setOpenCases]           = useState([]);
  const [closeCases, setCloseCases]         = useState([]);
  const [topComplaints, setTopComplaint]    = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/complaints/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((complaints) => {
        // checks output of response (user complaints)
        //console.log(complaints);
        setUserComplaints(complaints);
      });

      fetch("http://127.0.0.1:8000/api/complaints/openCases/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((openDate) => {
          // checks output of response (user complaints with no closedate)
          // console.log(openDate);
          setOpenCases(openDate);
  });

  fetch("http://127.0.0.1:8000/api/complaints/closedCases/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((closeDate) => {
          // checks output of response (user complaints with closedate)
          // console.log(closeDate);
          setCloseCases(closeDate);
  });

  fetch("http://127.0.0.1:8000/api/complaints/topComplaints/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((topcomplaint) => {
          // checks output of response (user complaints with top complaint)
          // console.log(topcomplaint);
          setTopComplaint(topcomplaint);
  });
      
  }, [userToken]);

 //Monkey patch: frequency counter does not work but the idea was there
 //need input to take in a string 
 //this was to deal with an arrray of int
  // function countComplaint(arr){
  //   const count={};
  //   for(let i=0; i < arr.length; i++){
  //     count[i] = (count[arr[i]] || 0) + 1 ;
  //   }
  //   return console.log(count)
  // }
  // const placeholder= userComplaints.map((complaints)=> [complaints.complaint_type])
  // const arr = placeholder.flat(1)
  // console.log(countComplaint(arr))
  // console.log(arr)

  //returns an array of top complaints and in clientside return the most occuring complaint in their district
  const topCom = topComplaints.map((topComplaint) => { 
    return(
   [topComplaint.complaint_type]
    )
  })
// console.log(topCom)
  return (
    <div className="table">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        <table className="table" style={{ border: "1px solid black", borderCollapse: "collapse" }}>
          <thead>
            <th>Open Cases</th>
            <th>Closed Cases</th>
            <th>Top Complaint</th>
          </thead>
          <tbody>
            <tr>
            <td>{openCases.length}</td>
            <td>{closeCases.length}</td>
            <td>{topCom[0]}</td>
            </tr>
          </tbody>
        </table>
        <table
          key={userComplaints.uniquekey}
          style={{ border: "1px solid black", borderCollapse: "collapse" }}
        >
          <thead style={{ border: "1px solid black", borderCollapse: "collapse" }}>
            <tr
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              <th>Key</th>
              <th>Account</th>
              <th>Council</th>
              <th>Borough</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Community Board</th>
              <th>Complaint Type</th>
              <th>Descriptor</th>
              <th>Open Date</th>
              <th>Close Date</th>
            </tr>
          </thead>
          
            {userComplaints.map((complaint) => {
              return (
                <tbody
                style={{ border: "1px solid black", borderCollapse: "collapse" , padding:"10px",justifyContent:"space-evenly", alignContent:"center"}}
              >
                <tr>
                  <td>{complaint.unique_key}</td>
                  <td>{complaint.account}</td>
                  <td>{complaint.council_dist}</td>
                  <td>{complaint.borough}</td>
                  <td>{complaint.city}</td>
                  <td>{complaint.zip}</td>
                  <td>{complaint.community_board}</td>
                  <td>{complaint.complaint_type}</td>
                  <td>{complaint.descriptor}</td>
                  <td>{complaint.opendate}</td>
                  <td>{complaint.closedate}</td>
                </tr>
                </tbody>
              );
            })}
      
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

import React,{useState, useEffect} from "react";
import "./dashboard.css";
function Dashboard({ userToken, setUserToken}){
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

  const theading= ["Key", "Account", "Council","Borough", "City", "Zip Code", "Community Board", "Complaint Type", "Descriptor", "Open Date","Close Date"]
// console.log(topCom)

  return (
    <div className= "centerpage">
      
        <table className= "table">
          <thead>
            <tr>
            <th>Open Cases</th>
            <th>Closed Cases</th>
            <th>Top Complaint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{openCases.length}</td>
            <td>{closeCases.length}</td>
            <td>{topCom[0]}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <table
          key={userComplaints.uniquekey}
          className="table"  
        >
          <thead>
            <tr>
              {theading.map((thead) => {
                return(
                  <th key={thead}>{thead}</th>
                )
              })}

            </tr>
          </thead>
          <tbody>
            {userComplaints.map((complaint) => {
              return (
                <tr key={complaint.unique_key}>
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
                
              );
            })}
      </tbody>
        </table>
      
    </div>
  );
}

export default Dashboard;

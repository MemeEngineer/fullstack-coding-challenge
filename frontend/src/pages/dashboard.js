import React,{useState, useEffect} from "react";
import "./dashboard.css";
import { PieChart, Pie, Cell,  BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend } from "recharts";
// import Bar from "../components/bar.js";

function Dashboard({ userToken, setUserToken, islogin, setLogin}){
  const [userComplaints, setUserComplaints] = useState([]);
  const [openCases, setOpenCases]           = useState([]);
  const [closeCases, setCloseCases]         = useState([]);
  const [topComplaints, setTopComplaint]    = useState([]);
  const [constituents, setConstituents]     = useState([]);
  const [onUpdate, setOnUpdate]             = useState(false);
  const [onReturn, setOnReturn]             = useState(false);
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

//refactoring the table headers into array
  const theading= ["Key", "Account", "Council","Borough", "City", "Zip Code", "Community Board", "Complaint Type", "Descriptor", "Open Date","Close Date"]



//sends null to usertoken logging user out
function handleLogout(){
  setUserToken()
  setLogin(false)
}


//fetchs from new api route to update table with complaints in the users council district
function handleUpdate(){
 if(onUpdate === false){
  return setOnUpdate(true)
 }else{
return (
  setOnUpdate(false) 
    )
  }
}
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/complaints/constituents/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((constituent) => {
        // checks output of response (constituent complaints)
        //console.log(constituent);
        setConstituents(constituent);
      })
      setUserComplaints(constituents)
}, [onUpdate]);

// fetches back the original complaints made in the users account district
  function handleReturn(){
    if(onReturn === false){
      return setOnReturn(true)
     }else{
    return setOnReturn(false)
     }
    }
    

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
          setUserComplaints(userComplaints)
    }, [onReturn]);

//PIE CHART STUFF
    const datafrompie = [
      { name: 'Open Cases', value: openCases.length },
      { name: 'Closed Cases', value: closeCases.length },
    ];

    const COLORS = ['#FF0000', '#2F56A6',];

    const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        name
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
            {name}
          </text>
        );
      };

//BAR CHART STUFF
      const datafrombar = [
        {
          name: "Cases",
          Closed: closeCases.length,
          Open: openCases.length,
          Total: userComplaints.length,
        },
       
      ];
      
  return (
    <div>
      <div style={{display:"flex", justifyContent: "center",flexWrap:"wrap"}}>
      <PieChart width={400} height={400}>
                <Pie
                  data={datafrompie}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datafrompie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} nameKey="name" />
                  ))}
                </Pie>
              </PieChart>
              <BarChart
      width={500}
      height={300}
      data={datafrombar}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Closed" fill="#2F56A6" />
      <Bar dataKey="Open" fill="#FF0000" />
    </BarChart>
    </div>
    <div style={{display:"flex", justifyContent: "center",flexWrap:"wrap"}}>
       <button className="logout"  onClick={handleLogout}>Log Out</button>
      <button className="complaint"  onClick={handleUpdate}>Complaints by My Constituents</button>
      <button className="complaint"  onClick={handleReturn}> Complaints </button>
    </div>
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
        </div>

  );
}

export default Dashboard;

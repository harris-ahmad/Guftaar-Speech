import React from 'react';
import "./coach_dashboard.css";
import phonei from "../images/phoneicon.png"
import infoi from "../images/infoicon.png"
import NavbarCoach from './coach_navbar';
import Carousel from './coach_dashboard_carousel';
import Calendar from './calendar'
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("");
  const [meetingDetails, setDetails] = useState([])
  // const email = localStorage.getItem("email")

  useEffect(() => {
    const fetchData = async function () {
      let toSend = { email: localStorage.getItem("email") };
      let result2 = await axios.post(
        "http://localhost:4000/coach/getName",
        toSend
      );
      // alert(result2.data.firstName) 
      setName(result2.data.firstName)
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async function () {
      let toSend = { email: localStorage.getItem("email") };
      let result2 = await axios.post(
        "http://localhost:4000/coach/getMeetings",
        toSend
      );
      if (!(result2.data)){
        alert("no data")
      }
      else{
        setDetails(result2.data);
      } 
    };
    fetchData();
  }, []);


  return (
    <div className="admin-dashboard-bg">
       <NavbarCoach />
       <div className='welcome-heading'>
        Welcome, {name}
       </div>
       <div className='second-heading'>
        Upcoming Meetings
       </div>
       <div className='meetingbox1'>
        <h2 className='meetingname1'>Emaan Atique</h2>
        <img src={phonei} alt="PhoneIcon" className='phoneicon1' />
        <p className='meetingstext1'> meetings</p>
        <p className='time1'>01</p>
        <p className='time2'>:</p>
        <p className='time3'>59</p>
       </div>
       <div className='meetingbox2'>
        <h2 className='meetingname2'>Salman Rehman</h2>
        <img src={phonei} alt="PhoneIcon" className='phoneicon2' />
        <p className='meetingstext2'> meetings</p>
        <p className='time4'>01</p>
        <p className='time5'>:</p>
        <p className='time6'>59</p>
        <button className='viewallbutton'>view all</button>
       </div>
       <div className='third-heading'>
       Your Clients
       <button type="button" className='infoicon'>
       <img src={infoi} alt="InfoIcon" className='infoicon' />
        </button>
       </div>
       <div className='meetingscroll'>
        <button className='addnotesbutton'>+ add notes</button> 
        </div>
        <Carousel />
        <Calendar/>
    </div>
  );
}

export default Dashboard;

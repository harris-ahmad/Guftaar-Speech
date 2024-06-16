import React, { useState, useEffect, useCallback } from "react";
import "./client_dashboard.css";
import {
  qu,
  phone,
  course,
  arrow,
  happy,
  moderate,
  extreme,
  fire,
  volume,
  mic,
} from "../images";
import NavbarClient from "./client_navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchQuote = async () => {
  const { data } = await axios.get("http://api.quotable.io/random");
  return data.content;
};

const fetchClientDashboardDetails = async (email) => {
  const { data } = await axios.post(
    "http://localhost:4000/client/getClientDashboardDetails",
    { email }
  );
  return data;
};

const fetchMeetings = async (email) => {
  const { data } = await axios.post(
    "http://localhost:4000/client/getMeetings",
    { email }
  );
  return data;
};

const updateBackgroundColor = (selector, color) => {
  const element = document.querySelector(selector);
  if (element) {
    element.style.backgroundColor = color;
  } else {
    console.log("div not found");
  }
};

const Quote = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [firstName, setFirstName] = useState("");
  const [activeCourse, setCourse] = useState("");
  const [hasCourse, setHasCourse] = useState(true);
  const [coachName, setCoach] = useState("");
  const [hasMeeting, setMeeting] = useState(true);
  const [time, setTime] = useState(null);
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    fetchQuote().then(setQuote);

    const email = localStorage.getItem("email");
    fetchClientDashboardDetails(email).then((data) => {
      setFirstName(data.firstName);
      setCourse(data.currentActiveCourse);
      setHasCourse(!!data.currentActiveCourse.length);
    });

    fetchMeetings(email).then((data) => {
      setMeeting(!!data);
      if (data) {
        setCoach(data.name);
        setTime(new Date(data.time));
      }
    });
  }, []);

  useEffect(() => {
    if (!time) return;

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = time.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const handleStutteringClick = useCallback((target) => {
    updateBackgroundColor(
      ".circleBack",
      target === "no" ? "#F2F2F2" : "#71A7F140"
    );
    updateBackgroundColor(
      ".circleBack2",
      target === "moderate" ? "#F2F2F2" : "#71A7F140"
    );
    updateBackgroundColor(
      ".circleBack3",
      target === "extreme" ? "#F2F2F2" : "#71A7F140"
    );
  }, []);

  return (
    <div className="client-bg">
      <NavbarClient />
      <div className="mainwelcome">
        <h6 className="welcome">{firstName}'s Dashboard</h6>
      </div>
      <div className="quoteback">
        <img className="qu" src={qu} alt="Quote" />
        <h6 className="top1">Strength Statements</h6>
        <p className="text1">{quote}</p>
      </div>
      <div className="log">
        <p className="logtext1">How was your stuttering today?</p>
        <div className="circleBack"></div>
        <img
          className="happy"
          src={happy}
          onClick={() => handleStutteringClick("no")}
          alt="Happy"
        />
        <div className="circleBack2"></div>
        <img
          className="meh"
          src={moderate}
          onClick={() => handleStutteringClick("moderate")}
          alt="Moderate"
        />
        <div className="circleBack3"></div>
        <img
          className="sad"
          src={extreme}
          onClick={() => handleStutteringClick("extreme")}
          alt="Extreme"
        />
      </div>
      <p className="support1">Guided Speech Support</p>
      <div className="gbox1">
        <img className="phone" src={phone} alt="Phone" />
        {hasMeeting ? (
          <div>
            <h6 className="subtext">Coaching with {coachName} in</h6>
            {countdown.days && (
              <p className="timer">
                {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
                {countdown.seconds}s
              </p>
            )}
          </div>
        ) : (
          <h6 className="subtext">No Upcoming Meetings</h6>
        )}
        <h6 className="detail">Meetings</h6>
      </div>
      <div className="gbox2" onClick={() => navigate("/client/courses")}>
        <img className="course" src={course} alt="Course" />
        <h6 className="subtext">{hasCourse ? activeCourse : "Buy Courses"}</h6>
        <h6 className="detail">Courses</h6>
        <img className="arrow" src={arrow} alt="Arrow" />
      </div>
      <div>
        <div
          className="dailyTasks"
          onClick={() => navigate("/client/dailyActivities")}
        >
          <div className="rectangle"></div>
          <h6 className="activitytext">Daily Activities</h6>
          <img className="icon" src={fire} alt="Fire" />
          <a href="dailyActivities">
            <img className="arrow2" src={arrow} alt="Arrow" />
          </a>
        </div>
        <div
          className="speechTechniques"
          onClick={() => navigate("/client/speechTechniques")}
        >
          <div className="rectangle2"></div>
          <h6 className="activitytext">Speech Techniques</h6>
          <img className="icon" src={volume} alt="Volume" />
          <a href="speechTechniques">
            <img className="arrow2" src={arrow} alt="Arrow" />
          </a>
        </div>
        <div
          className="quickPractice"
          onClick={() => navigate("/client/quickPractice")}
        >
          <div className="rectangle2"></div>
          <h6 className="activitytext">Quick Practice</h6>
          <img className="icon" src={mic} alt="Mic" />
          <a href="quickPractice">
            <img className="arrow2" src={arrow} alt="Arrow" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Quote;

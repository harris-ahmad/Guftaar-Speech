import React from "react";
import { useNavigate } from "react-router-dom";
import lc from "../images/landing_client.svg";
import lcc from "../images/landing_coach.svg";
import sb from "../images/speechbubble.png";
import footer from "../images/footer.png";
import "../fonts/LeagueSpartan-VariableFont_wght.ttf";
import "./landing_page.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleCoachLogin = () => {
    navigate("/coach/login");
  };

  const handleClientLogin = () => {
    navigate("/client/login");
  };

  return (
    <div className="first" style={{ background: "#4d5399" }}>
      <h1 id="GH">Guftaar</h1>
      <h2 id="slogan">Speech Made Easy</h2>
      <button id="clientsignup" onClick={handleClientLogin}>
        <img id="lc" src={lc} alt="speech support" />
        I'm looking for speech support
      </button>
      <button id="coachlogin" onClick={handleCoachLogin}>
        <img id="lcc" src={lcc} alt="coach" />
        I'm a coach that offers services
      </button>
      <a id="admin" href="/admin/login">
        Admin Login
      </a>
      <h1 id="abt">About Us</h1>
      <img id="sb" src={sb} alt="speech bubble" />
      <p className="info" align="left">
        Guftaar is a speech therapy support web service, empowering PWS to take
        the first step in reclaiming their speech. With guided vocal practice,
        daily exercises, and positive reinforcement, through Guftaar, we want to
        make it easier for you to overcome your stuttering.
        <br />
        Beyond independent speech practice, Guftaar connects users to top-rated
        coaches for one-on-one mentorship calls, and brings exclusive access to
        purchase complete stammer support courses.
        <br />
        At Guftaar, we help make speech easy.
      </p>
      <h1 id="sj">Take Charge of Your Speech Journey</h1>
      <a id="cta" href="/client/register">
        Sign Up Now
      </a>
      <img id="footer" src={footer} alt="main-footer" />
    </div>
  );
}

export default LandingPage;

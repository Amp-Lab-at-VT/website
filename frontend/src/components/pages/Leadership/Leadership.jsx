//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import Navigation from "../../modules/Nav/Nav.jsx"
import LeadershipBox from "../../modules/LeadershipBox/LeadershipBox.jsx"

import Baumann from "../../../assets/img/Headshots/Baumann.jpg"
import Gibbons from "../../../assets/img/Headshots/Gibbons.jpg"
import Forsyth from "../../../assets/img/Headshots/Forsyth.jpg"
import Meadows from "../../../assets/img/Headshots/Meadows.jpg"

import "./leadership.css"

export default function Leadership() {


  return (
    <div>
    <Navigation></Navigation>
    <header class="App-standardPage">
      <div class="App-pageHelper">
        <h2>Meet Our Team: Student Staff</h2>
        <hr></hr>
        <div class = "flex-row">
          <LeadershipBox name = "Riichard Gibbons" src={Gibbons} title = "Richard Gibbons: Team Lead"></LeadershipBox>
          <LeadershipBox name = "Henry Forsyth" src={Forsyth} title = "Henry Forsyth: Mentor/Webdev"></LeadershipBox>
        </div>
        <h2>Meet Our Team: Professors</h2>
        <hr></hr>
        <div class = "flex-row">
          <LeadershipBox name = "William Baumann" src={Baumann} title = "Dr.William Baumann: Professor" email = "baumann@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Toby Meadows" src={Meadows} title = "Dr.Toby Meadows: Professor" email = "toby88@vt.edu"></LeadershipBox>
        </div>
      </div>
    </header>
  </div>
  );
}


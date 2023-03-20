//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";

import LeadershipBox from "@/comps/LeadershipBox/LeadershipBox.jsx"
import "@/pages/Leadership/leadership.module.css"

import Baumann from "../../public/Headshots/Baumann.jpg"
import Gibbons from "../../public/Headshots/Gibbons.jpg"
import Forsyth from "../../public/Headshots/Forsyth2.jpg"
import Meadows from "../../public/Headshots/Meadows.jpg"

export default function Leadership() {


  return (
    <div>
    <header class="App-standardPage">
      <div class="App-pageHelper">
        <h2>Meet Our Team: Student Staff</h2>
        <hr></hr>
        <div class = "flex-row-left">
          <LeadershipBox name = "Richard Gibbons" src={Gibbons} title = "Richard Gibbons: Team Lead" email = "gricha1@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Henry Forsyth" src={Forsyth} title = "Henry Forsyth: Mentor/Webdev" email = "rhforsythjr@vt.edu"></LeadershipBox>
        </div>
        <h2>Meet Our Team: Professors</h2>
        <hr></hr>
        <div class = "flex-row-left">
          <LeadershipBox name = "William Baumann" src={Baumann} title = "Dr.William Baumann: Professor" email = "baumann@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Toby Meadows" src={Meadows} title = "Dr.Toby Meadows: Professor" email = "toby88@vt.edu"></LeadershipBox>
        </div>
      </div>
    </header>
  </div>
  );
}



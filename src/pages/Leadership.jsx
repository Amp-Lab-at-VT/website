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
      <header className="App-standardPage">
        <div className="App-pageHelper">
          <h2>Meet Our Team: Student Staff</h2>
          <hr />
          <div class="flex-row-left">
            <LeadershipBox name="Richard Gibbons" src={Gibbons} title="Richard Gibbons: Team Lead" email="gricha1@vt.edu" />
            <LeadershipBox name="Henry Forsyth" src={Forsyth} title="Henry Forsyth: Mentor/Webdev" email="rhforsythjr@vt.edu" />
          </div>
          <h2>Meet Our Team: Professors</h2>
          <hr />
          <div class="flex-row-left">
            <LeadershipBox name="William Baumann" src={Baumann} title="Dr.William Baumann: Professor" email="baumann@vt.edu" />
            <LeadershipBox name="Toby Meadows" src={Meadows} title="Dr.Toby Meadows: Professor" email="toby88@vt.edu" />
          </div>
        </div>
      </header>
    </div>
  );
}



//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";

import LeadershipBox from "@/comps/LeadershipBox/LeadershipBox.jsx"
import Baumann from "../../public/Headshots/Baumann.jpg"
import Gibbons from "../../public/Headshots/Gibbons.jpg"
import Forsyth from "../../public/Headshots/Forsyth2.jpg"
import Meadows from "../../public/Headshots/Meadows.jpg"
import Pritchard from "../../public/Headshots/Pritchard.jpeg"
import Blank from "../../public/Headshots/blank.jpeg"
import Ethan from "../../public/Headshots/Ethan.jpg"
import PB from "../../public/Headshots/pb.jpeg"

export default function Leadership() {


  return (
    <div>
      <div class="App-pageHelper">
        <h2>Meet Our Team: Student Staff</h2>
        <hr></hr>
        <div class = "flex-row-left">
          <LeadershipBox name = "Richard Gibbons" src={Gibbons} title = "Richard Gibbons: Team Lead" email = "gricha1@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Henry Forsyth" src={Forsyth} title = "Henry Forsyth: Mentor/Webdev" email = "rhforsythjr@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Eddie Pritchard" src={Pritchard} title = "Eddie Pritchard: Mentor" email = "epritchard@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Purv Bavishi" src={PB} title = "Purv Bavishi: Mentor" email = "purvbavishi@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Ethan James" src={Ethan} title = "Ethan James: Mentor" email = "ethanjamesauto@vt.edu"></LeadershipBox>
        </div>
        <h2>Meet Our Team: Professors</h2>
        <hr></hr>
        <div class = "flex-row-left">
          <LeadershipBox name = "William Baumann" src={Baumann} title = "Dr.William Baumann: Professor" email = "baumann@vt.edu"></LeadershipBox>
          <LeadershipBox name = "Toby Meadows" src={Meadows} title = "Dr.Toby Meadows: Professor" email = "toby88@vt.edu"></LeadershipBox>
        </div>
      </div>
  </div>
  );
}



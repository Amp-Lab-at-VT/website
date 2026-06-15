import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import LeadershipBox from "@/comps/LeadershipBox/LeadershipBox.jsx";
import Baumann from "../../public/Headshots/Baumann.jpg";
import Wells from "../../public/Headshots/Wells.jpg";
import Forsyth from "../../public/Headshots/Forsyth2.jpg";
import Meadows from "../../public/Headshots/Meadows.jpg";
import Pritchard from "../../public/Headshots/Pritchard.jpeg";
import Ethan from "../../public/Headshots/Ethan.jpg";
import PB from "../../public/Headshots/pb.jpeg";
import Yassin from "../../public/Headshots/yassin.jpg";
import phillip from "../../public/Headshots/phillip.jpg";
import millburn from "../../public/Headshots/millburn.png";
import cherkassiky from "../../public/Headshots/cherkassiky.JPG";
import Jijun from "../../public/Headshots/Jijun.jpg";
import Alek from "../../public/Headshots/Alek.jpg";
import Shane_Wyman from "../../public/Headshots/Shane_Wyman.png";

import Layout from "@/comps/layout.jsx";

function Leadership() {
  
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Meet Our Team: Student Staff
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <LeadershipBox
          name="Daniel Cherkasskiy"
          src={cherkassiky}
          title="Lab Lead"
          email="cherkasskiyd@vt.edu"
          linkedin="https://www.linkedin.com/in/daniel-cherkasskiy/"
        />
        <LeadershipBox
          name="Jijun Niu"
          src={Jijun}
          title="Lab Safety Lead/Web Maintain"
          email="njijun24@vt.edu"
          linkedin="https://www.linkedin.com/in/jijunniu/"
        />
        <LeadershipBox
          name="Alek Salvetti"
          src={Alek}
          title="Soldering Trainer"
          email="aleks@vt.edu"
        />
        <LeadershipBox
          name="Shane Wyman"
          src={Shane_Wyman}
          title="Lead Soldering Trainer"
          email="shanew05@vt.edu"
          linkedin="https://www.linkedin.com/in/shane-wyman-7792a8216/"
        />


      </Grid>


      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Meet Our Team: Student Alumni
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <LeadershipBox
          name="Phillip Bozzay"
          src={phillip}
          title="2025 Lab Lead"
          email="phillipb23@vt.edu"
          linkedin="https://www.linkedin.com/in/phillip-bozzay-830699220/"
        />
        <LeadershipBox
          name="Tyler Wells"
          src={Wells}
          title="2024 Lab Lead"
          email="tylermwells@vt.edu"
          linkedin="https://www.linkedin.com/in/tyler-wells-8042185849/"
        />
        <LeadershipBox
          name="Henry Forsyth"
          src={Forsyth}
          title="2023 Lab Lead/Webdev"
          email="rhforsythjr@vt.edu"
          linkedin="https://www.linkedin.com/in/henry-forsyth-jr/"
        ></LeadershipBox>
        <LeadershipBox
          name="Eddie Pritchard"
          src={Pritchard}
          title="Mentor"
          email="epritchard@vt.edu"
          linkedin="https://www.linkedin.com/in/e-pritchard/"
        ></LeadershipBox>
        <LeadershipBox
          name="Purv Bavishi"
          src={PB}
          title="Soldering Trainer/Mentor"
          email="purvbavishi@vt.edu"
          linkedin="https://www.linkedin.com/in/purv-bavishi/"
        ></LeadershipBox>
        <LeadershipBox
          name="Ethan James"
          src={Ethan}
          title="Mentor"
          email="ethanjamesauto@vt.edu"
          linkedin="https://www.linkedin.com/in/ethan-james-9aa023210/"
        ></LeadershipBox>

      </Grid>


      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Meet Our Team: Professors
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <LeadershipBox
          name="William Baumann"
          src={Baumann}
          title="Professor"
          email="baumann@vt.edu"
        />
        <LeadershipBox
          name="Toby Meadows"
          src={Meadows}
          title="Professor"
          email="toby88@vt.edu"
        />
        <LeadershipBox
          name="Tyler Millburn"
          src={millburn}
          title="Professor"
          email="tylermilburn@vt.edu"
        />
      </Grid>
    </Box>
  );
}

export default Layout(Leadership);

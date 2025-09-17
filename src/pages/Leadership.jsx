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
import Jijun from "../../public/Headshots/Jijun.jpg";
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
          name="Phillip Bozzay"
          src={phillip}
          title="Lab Lead"
          email="phillipb23@vt.edu"
          />
          <LeadershipBox
          name="Jijun Niu"
          src={Jijun}
          title="Lab Safety Lead/Web Maintain"
          email="njijun24@vt.edu"
          />

            {/* <LeadershipBox
            name="Yassin Lahrime"
            src={Yassin}
            title="Mentor"
            email="yassinl@vt.edu"
          ></LeadershipBox> */}
      </Grid>


      <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
        Meet Our Team: Student Alumni
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
      <LeadershipBox
          name="Tyler Wells"
          src={Wells}
          title="Lab Lead"
          email="tylermwells@vt.edu"
          />
          <LeadershipBox
            name="Henry Forsyth"
            src={Forsyth}
            title="Lab Lead/Webdev"
            email="rhforsythjr@vt.edu"
          ></LeadershipBox>
          <LeadershipBox
            name="Eddie Pritchard"
            src={Pritchard}
            title="Mentor"
            email="epritchard@vt.edu"
          ></LeadershipBox>
          <LeadershipBox
            name="Purv Bavishi"
            src={PB}
            title="Souldering Trainer/Mentor"
            email="purvbavishi@vt.edu"
          ></LeadershipBox>
          <LeadershipBox
            name="Ethan James"
            src={Ethan}
            title="Mentor"
            email="ethanjamesauto@vt.edu"
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
      </Grid>
    </Box>
  );
}

export default Layout(Leadership);

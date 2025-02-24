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
          name="Tyler Wells"
          src={Wells}
          title="Lab Lead"
          email="tylermwells@vt.edu"
        />
          <LeadershipBox
            name="Henry Forsyth"
            src={Forsyth}
            title="Henry Forsyth: Mentor/Webdev"
            email="rhforsythjr@vt.edu"
          ></LeadershipBox>
          <LeadershipBox
            name="Eddie Pritchard"
            src={Pritchard}
            title="Eddie Pritchard: Mentor"
            email="epritchard@vt.edu"
          ></LeadershipBox>
          <LeadershipBox
            name="Purv Bavishi"
            src={PB}
            title="Purv Bavishi: Mentor"
            email="purvbavishi@vt.edu"
          ></LeadershipBox>
          <LeadershipBox
            name="Ethan James"
            src={Ethan}
            title="Ethan James: Mentor"
            email="ethanjamesauto@vt.edu"
          ></LeadershipBox>
            <LeadershipBox
            name="Yassin Lahrime"
            src={Yassin}
            title="Yassin Lahrime: Mentor"
            email="yassinl@vt.edu"
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

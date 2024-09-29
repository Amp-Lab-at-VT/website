import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import LeadershipBox from "@/comps/LeadershipBox/LeadershipBox.jsx";
import Baumann from "../../public/Headshots/Baumann.jpg";
import Gibbons from "../../public/Headshots/Gibbons.jpg";
import Forsyth from "../../public/Headshots/Forsyth2.jpg";
import Meadows from "../../public/Headshots/Meadows.jpg";
import Pritchard from "../../public/Headshots/Pritchard.jpeg";
import Ethan from "../../public/Headshots/Ethan.jpg";
import PB from "../../public/Headshots/pb.jpeg";

export default function Leadership() {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Meet Our Team: Student Staff
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <LeadershipBox
          name="Richard Gibbons"
          src={Gibbons}
          title="Team Lead"
          email="gricha1@vt.edu"
        />
        <LeadershipBox
          name="Henry Forsyth"
          src={Forsyth}
          title="Mentor / Web Developer"
          email="rhforsythjr@vt.edu"
        />
        <LeadershipBox
          name="Eddie Pritchard"
          src={Pritchard}
          title="Mentor"
          email="epritchard@vt.edu"
        />
        <LeadershipBox
          name="Purv Bavishi"
          src={PB}
          title="Mentor"
          email="purvbavishi@vt.edu"
        />
        <LeadershipBox
          name="Ethan James"
          src={Ethan}
          title="Mentor"
          email="ethanjamesauto@vt.edu"
        />
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

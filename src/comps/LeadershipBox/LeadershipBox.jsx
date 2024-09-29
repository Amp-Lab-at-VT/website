import React from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";

const LeadershipBox = ({ name, title, email, src }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          src={src.src}
          alt={`Headshot of ${name}`}
          sx={{ width: 120, height: 120, margin: "0 auto" }}
        />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="body2">
          <a href={`mailto:${email}`} aria-label={`Send an email to ${name}`}>
            {email}
          </a>
        </Typography>
      </Box>
    </Grid>
  );
};

export default LeadershipBox;

import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Typography, Avatar, Grid, IconButton } from "@mui/material";

const LeadershipBox = ({ name, title, email, src, linkedin }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          src={src.src}
          alt={`Headshot of ${name}`}
          sx={{
            width: {
              xs: '40vw',  // 30% of the viewport width on small screens
              sm: '40vw',  // 20% on medium screens
              md: '25vw',  // 15% on larger screens
            },
            height: {
              xs: '40vw',
              sm: '40vw',
              md: '25vw',
            },
            margin: "0 auto"
          }}
        />

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="body2">
          <Box
            component="a"
            href={`mailto:${email}`}
            aria-label={`Send an email to ${name}`}
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.main",
              },
            }}
          >
            {email}
          </Box>
        </Typography>
        {linkedin && (
          <IconButton
            component="a"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 1,
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <LinkedInIcon />
          </IconButton>
        )}

      </Box>
    </Grid>
  );
};

export default LeadershipBox;

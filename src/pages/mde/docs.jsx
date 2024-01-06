import React from "react";
import {Typography, Box, Container, Stack, Paper, Fade, Card, Button} from "@mui/material";

export default function Page() {
  return (
    <Container>
        <div class = "App-pageHelper">
          <Typography variant = "h4">Documents for MDE Students</Typography>
          <Typography variant = "caption">Below are the documents for MDE students. If you have any questions, please contact the leadership team.</Typography>
          <Stack>
            <SingleDoc title = "MDE Handbook" description = "The MDE Handbook contains all the rules and regulations for MDE students." link = "/docs/MDE_Handbook.pdf" last_updated = "10/10/2021"/>


          </Stack>
        </div> 
    </Container>
  );
}

function SingleDoc(props)
{

  const {title, description, link, last_updated} = props;

  return (
    <Fade in={true} timeout={1000}>
      <Card sx={{p : "20px"}}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography variant = "h6">{title}</Typography>
          <Typography variant = "caption">Last Updated: {last_updated}</Typography>
        </Box>
        <Typography variant = "body1">{description}</Typography>
        <Button href = {process.env.NEXT_PUBLIC_BASE_URL + link}>View Document</Button>
      </Card>
    </Fade>
    )
}
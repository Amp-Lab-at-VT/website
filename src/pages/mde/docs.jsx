import React from "react";
import {Typography, Box, Container, Stack, Paper, Fade, Card, Button} from "@mui/material";

export default function Page() {

  const branchName = "master"

  return (
    <Container>
        <div class = "App-pageHelper">
          <Typography variant = "h4">Documents for MDE Students</Typography>
          <Typography variant = "caption">Below are the documents for MDE students. If you have any questions, please contact the leadership team.</Typography>
          <Stack>
            <SingleDoc title = "ECE Design Studio Policy" description = "This contains the policy for the ECE Design Studio."  link = {`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Design%20Studio%20Policy.docx`} last_updated = "1/5/2024"/>
            <SingleDoc title = "ECE Integrated Design Studio Waiver" description = "This contains the waiver for the ECE Integrated Design Studio."  link = {`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Waiver.docx`} last_updated = "1/5/2024"/>
            <SingleDoc title = "Lab Training Guide Draft Rev. 1" description = "This contains the Lab Training Guide Draft Rev. 1."  link = {`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/Lab%20Training%20Guide%20Draft%20Rev.%201.docx`} last_updated = "1/5/2024"/>

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
      <Card sx={{p : "20px", mb: 2}}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography variant = "h6">{title}</Typography>
          <Typography variant = "caption">Last Updated: {last_updated}</Typography>
        </Box>
        <Typography variant = "body1">{description}</Typography>
        <Button href = {link}>Download Document</Button>
      </Card>
    </Fade>
    )
}
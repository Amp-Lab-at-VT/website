import React from "react";
import {
  Typography,
  Box,
  Container,
  Stack,
  Paper,
  Fade,
  Card,
  Button,
  Alert,
} from "@mui/material";

export default function Page() {
  const branchName = "master";

  return (
    <Container>
      <div class="App-pageHelper">
        <Typography variant="h4">Documents for Students using the ECE Design Studio</Typography>
        <Alert severity="info">
          Below are doucments you will need to read and sign before you can use the ECE Design Studio.
          Note that these documents are universal to both the MDE and AMP lab sides of the lab, but 
          they do NOT grant you access to both sides of the lab. You will need to be apart of the 
          AMP lab to use their side.
        </Alert>
        <Stack>
          <SingleDoc
            title="ECE Design Studio Policy"
            description="This contains the policy for the ECE Design Studio."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Design%20Studio%20Policy.docx`}
            last_updated="1/5/2024"
          />
          <SingleDoc
            title="ECE Integrated Design Studio Waiver"
            description="This contains the waiver for the ECE Integrated Design Studio."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Waiver.docx`}
            last_updated="1/5/2024"
          />
          <SingleDoc
            title="Lab Training Guide Rev 2"
            description={
              <Box>
                <Alert severity = "warning">This is the document you will submit for swipe access</Alert>
                <Typography>This contains the Lab Training Guide</Typography>
              </Box>
            }
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/Lab%20Training%20Guide%20Rev%202.docx`}
            last_updated="1/16/2024"
          />
        </Stack>
      </div>
    </Container>
  );
}

function SingleDoc(props) {
  const { title, description, link, last_updated } = props;

  return (
    <Fade in={true} timeout={1000}>
      <Card sx={{ p: "20px", mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption">
            Last Updated: {last_updated}
          </Typography>
        </Box>
        <Box>{description}</Box>
        <Button href={link}>Download Document</Button>
      </Card>
    </Fade>
  );
}

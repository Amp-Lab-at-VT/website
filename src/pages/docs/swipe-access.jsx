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
        <Typography variant="h4">
          Documents for Students using the ECE Design Studio
        </Typography>
        <Alert sx={{ marginBottom: "10px" }} severity="info">
          The documents on this page are utilized to obtain swipe access to AMP
          Lab (Whittemore 264), MDE Lab (Whittemore 264) and/or Robotics Lab
          (Durham 373). To obtain swipe access to these labs, download and
          adhere to requirements outlined in the Lab Training Guide. ECE Lab
          Policy and ECE Lab Waiver are support documents called out in the Lab
          Training Guide.
        </Alert>
        <Alert sx={{ marginBottom: "10px" }} severity="info">
          Note: These documents are universal to both the MDE and AMP lab sides
          of the lab, but they do NOT grant you access to both sides of the lab.
          You will need to be apart of the AMP lab to use their side
        </Alert>
        <Stack>
          <SingleDoc
            title="Lab Training Guide"
            description="This contains the Lab Training Guide"
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/Lab%20Training%20Guide%20Rev%202.docx`}
            last_updated="1/16/2024"
          />
          <SingleDoc
            title="ECE Lab Policy"
            description="This contains the policy for the ECE Lab Policy."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Design%20Studio%20Policy.docx`}
            last_updated="1/5/2024"
          />
          <SingleDoc
            title="ECE Lab Waiver"
            description={
              <Box>
                <Alert severity="warning">
                  This is the document you will submit for swipe access
                </Alert>
                <Typography>
                  This contains the waiver for the ECE Lab
                </Typography>
              </Box>
            }
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Waiver.docx`}
            last_updated="1/5/2024"
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

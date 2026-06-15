import React from "react";
import { useTheme } from "@mui/material";
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
import Layout from "@/comps/layout.jsx";

function Page() {
  const branchName = "master";
  const theme = useTheme();

  return (
    <Container>
      <div class="App-pageHelper">

        {/* HERO SECTION */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            Swipe Access Docs
          </Typography>
        </Box>
        <Alert sx={{ marginBottom: "10px" }} severity="info">
          This page contains documents required to obtain swipe access
          to the AMP Lab (Whittemore 264), MDE Lab (Whittemore 264),
          and/or Robotics Lab (Durham 373). To gain access, download and
          complete the requirements in the Lab Training Guide. The ECE
          Lab Policy and ECE Lab Waiver are supporting documents referenced in the guide.
        </Alert>
        <Stack>
          <SingleDoc
            title="Welcome to the AMP LAB~  You are probably here to request access to the AMP LAB ٩(｡・ω・｡)و "
            description="Follow the Lab Training and Swipe Access Guide below"
            link={`https://github.com/Amp-Lab-at-VT/website/raw/niujijun143-patch-1/docs/mde_docs/Request%20Swipe%20Access.docx`}
            last_updated="6/14/2026"
          />
          <SingleDoc
            title="ECE Lab Policy"
            description="This contains the policy for the ECE Lab Policy."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Design%20Studio%20Policy.docx`}
            last_updated="6/14/2026"
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
            last_updated="6/14/2026"
          />
        </Stack>

        <Alert sx={{ marginBottom: "10px" }} severity="info">
          Note: These documents are universal to both the MDE and AMP lab sides
          of the lab, but they do NOT grant you access to both sides of the lab.
          You will need to be apart of the AMP lab to use their side
        </Alert>
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

export default Layout(Page);

import React from "react";
import { useTheme } from "@mui/material";
import {
  Typography,
  Box,
  Container,
  Stack,
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
      <div className="App-pageHelper">

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

        {/* AMP LAB ACCESS INFORMATION */}
        <Alert sx={{ marginBottom: "10px" }} severity="info">
          This page contains the documents required to obtain swipe access to
          the AMP Lab in Whittemore 234. To request access, download and
          complete the requirements in the Lab Training and Swipe Access Guide.
          The ECE Lab Policy and ECE Lab Waiver are supporting documents
          referenced in the guide.
        </Alert>

        <Stack>
          {/* SWIPE ACCESS GUIDE */}
          <SingleDoc
            title="AMP Lab Swipe Access"
            description="Follow the Lab Training and Swipe Access Guide below to complete the requirements for AMP Lab access."
            link="https://github.com/Amp-Lab-at-VT/website/raw/niujijun143-patch-1/docs/mde_docs/Request%20Swipe%20Access.docx"
            last_updated="9/1/2026"
          />

          {/* ECE LAB POLICY */}
          <SingleDoc
            title="ECE Lab Policy"
            description="This document contains the ECE Lab Policy referenced in the Lab Training and Swipe Access Guide."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Design%20Studio%20Policy.docx`}
            last_updated="9/1/2026"
          />

          {/* ECE LAB WAIVER */}
          <SingleDoc
            title="ECE Lab Waiver"
            description={
              <Box>
                <Alert severity="warning" sx={{ mb: 1 }}>
                  This is the document you will submit when requesting swipe
                  access.
                </Alert>
                <Typography>
                  This document contains the ECE Lab Waiver required for AMP Lab
                  access.
                </Typography>
              </Box>
            }
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Waiver.docx`}
            last_updated="9/1/2026"
          />
        </Stack>

        {/* MDE ACCESS INFORMATION */}
        <Alert sx={{ marginBottom: "10px" }} severity="info">
          This page is only for AMP Lab swipe access. For MDE Lab swipe access,
          please contact Joe Adams at{" "}
          <a href="mailto:wjadams@vt.edu">wjadams@vt.edu</a> or Daniel Connors at{" "}
          <a href="mailto:dpconnors@vt.edu">dpconnors@vt.edu</a>.
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
            gap: 2,
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

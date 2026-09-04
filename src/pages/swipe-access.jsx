import React from "react";
import {
  Typography,
  Box,
  Container,
  Stack,
  Fade,
  Card,
  Button,
  Alert,
  Link,
} from "@mui/material";
import Layout from "@/comps/layout.jsx";

function Page() {
  const branchName = "master";

  return (
    <Container>
      <div className="App-pageHelper">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mt: 2,
            mb: 6,
          }}
        >
          Swipe Access Documents
        </Typography>

        <Alert sx={{ marginBottom: "10px" }} severity="info">
          This page contains the documents required for AMP Lab swipe access to
          the ECE Integrated Design Studio in Whittemore 234. To request access,
          download and complete the requirements outlined in the AMP Lab Swipe
          Access Guide. The Lab Policy and Lab Waiver are supporting documents
          referenced in the guide.
        </Alert>

        <Stack>
          <SingleDoc
            title="AMP Lab Swipe Access Guide"
            description="Follow the AMP Lab Swipe Access Guide below to complete the requirements for AMP Lab access."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/Request%20Swipe%20Access.docx`}
            last_updated="9/3/2026"
          />

          <SingleDoc
            title="Lab Policy"
            description="This document contains the ECE Integrated Design Studio policies referenced in the AMP Lab Swipe Access Guide."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Policy.docx`}
            last_updated="9/3/2026"
          />

          <SingleDoc
            title="Lab Waiver"
            description={
              <Box>
                <Alert severity="warning" sx={{ mb: 1 }}>
                  This is the document you will submit when requesting swipe
                  access.
                </Alert>

                <Typography>
                  This document contains the ECE Integrated Design Studio Waiver
                  required for AMP Lab access.
                </Typography>
              </Box>
            }
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Waiver.docx`}
            last_updated="9/3/2026"
          />
        </Stack>

        <Alert
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
          severity="info"
        >
          This page is only for AMP Lab swipe access. For MDE swipe access,
          please contact Joe Adams at{" "}
          <Link href="mailto:wjadams@vt.edu">wjadams@vt.edu</Link> or Daniel
          Connors at{" "}
          <Link href="mailto:dpconnors@vt.edu">dpconnors@vt.edu</Link>.
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
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="h6">{title}</Typography>

          <Typography
            variant="caption"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
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

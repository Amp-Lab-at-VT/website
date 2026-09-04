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
} from "@mui/material";
import Layout from "@/comps/layout.jsx";

function Page() {
  const branchName = "master";

  return (
    <Container>
      <div className="App-pageHelper">
        <Typography variant="h4" sx={{ mb: 2 }}>
          ECE Design Studio Swipe Access
        </Typography>

        <Alert sx={{ marginBottom: "10px" }} severity="info">
          These documents are used by AMP members requesting swipe access to
          the ECE Integrated Design Studio in Whittemore 234. Follow the AMP
          Swipe Access Guide and complete all required training and
          documentation before submitting your access request.
        </Alert>

        <Alert sx={{ marginBottom: "20px" }} severity="info">
          The ECE Design Studio contains separate MDE and AMP sides. Swipe
          access to Whittemore 234 does not automatically authorize use of both
          sides of the lab. AMP resources are reserved for active AMP members
          working on approved AMP projects.
        </Alert>

        <Stack>
          <SingleDoc
            title="AMP Swipe Access Guide"
            description="Follow this guide to complete the requirements for AMP swipe access to Whittemore 234."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/Request%20Swipe%20Access.docx`}
            last_updated="9/3/2026"
          />

          <SingleDoc
            title="ECE Design Studio Policy"
            description="Read the ECE Design Studio policies, safety requirements, and rules for use of the MDE and AMP sides of the lab."
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Design%20Studio%20Policy.docx`}
            last_updated="9/3/2026"
          />

          <SingleDoc
            title="ECE Integrated Design Studio Waiver"
            description={
              <Box>
                <Alert severity="warning" sx={{ mt: 1, mb: 1 }}>
                  This waiver must be completed and submitted as part of the AMP
                  onboarding process.
                </Alert>

                <Typography>
                  Read, complete, and sign this waiver before requesting swipe
                  access.
                </Typography>
              </Box>
            }
            link={`https://github.com/Amp-Lab-at-VT/website/raw/${branchName}/docs/mde_docs/ECE%20Integrated%20Design%20Studio%20Waiver.docx`}
            last_updated="9/3/2026"
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
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="h6">{title}</Typography>

          <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
            Last Updated: {last_updated}
          </Typography>
        </Box>

        <Box sx={{ mt: 1, mb: 1 }}>{description}</Box>

        <Button href={link}>Download Document</Button>
      </Card>
    </Fade>
  );
}

export default Layout(Page);

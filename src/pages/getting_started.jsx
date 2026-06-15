import React from "react";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Layout from "@/comps/layout.jsx";
import IconAndName from "@/comps/IconAndName/IconAndName";

import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";

import { motion } from "framer-motion";

import { MdOutlineWavingHand } from "react-icons/md";
import { GiReturnArrow, GiSolderingIron, GiSwipeCard } from "react-icons/gi";
import { BsPrinterFill } from "react-icons/bs";
import { RxDiscordLogo } from "react-icons/rx";
import { BiPurchaseTagAlt } from "react-icons/bi";

function GettingStarted({ new_members, returning_members }) {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* HERO */}
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
              Getting Started
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              Choose your path below to begin working with the AMP Lab
            </Typography>
          </Box>

          {/* ROW 1 */}
          <Grid container spacing={3} justifyContent="center">

            {/* NEW MEMBERS */}
            <Grid item xs={12} md={4}>
              <IconAndName
                icon={<MdOutlineWavingHand />}
                title="New Members"
                buttonTitle="Start Here"
                color="#f9f9f9"
              >
                <Typography variant="body2">
                  If you need help, visit the lab or ask on Discord.
                </Typography>

                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {new_members}
                </ReactMarkdown>
              </IconAndName>
            </Grid>

            {/* RETURNING MEMBERS */}
            <Grid item xs={12} md={4}>
              <IconAndName
                icon={<GiReturnArrow />}
                title="Returning Members"
                buttonTitle="Continue"
                color="#f9f9f9"
              >
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {returning_members}
                </ReactMarkdown>
              </IconAndName>
            </Grid>

            {/* SWIPE ACCESS */}
            <Grid item xs={12} md={4}>
              <IconAndName
                href="/swipe-access"
                icon={<GiSwipeCard />}
                title="Lab Swipe Access"
                buttonTitle="Get Access"
                color="#f9f9f9"
              />
            </Grid>

          </Grid>

          {/* ROW 2 */}
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>

            <Grid item xs={12} md={3}>
              <IconAndName
                href="https://discord.gg/DjFCeQEMmE"
                icon={<RxDiscordLogo />}
                title="Join Discord"
                buttonTitle="Open"
                color="#f9f9f9"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <IconAndName
                href="/soldering"
                icon={<GiSolderingIron />}
                title="Solder Training"
                buttonTitle="Learn"
                color="#f9f9f9"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <IconAndName
                href="https://github.com/Amp-Lab-at-VT/print-queue/issues/new?assignees=octocat&labels=3d-print&template=3d_print.yml&title=%5B3d-print%5D%3A+"
                icon={<BsPrinterFill />}
                title="3D Printing"
                buttonTitle="Request"
                color="#f9f9f9"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <IconAndName
                icon={<BiPurchaseTagAlt />}
                title="Purchase Request"
                buttonTitle="Submit"
                color="#f9f9f9"
              />
            </Grid>

          </Grid>

        </motion.div>

      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const new_members = await fs.readFile(
    process.cwd() + "/docs/new_members.md",
    "utf8"
  );

  const returning_members = await fs.readFile(
    process.cwd() + "/docs/returning_members.md",
    "utf8"
  );

  return { props: { new_members, returning_members } };
}

export default Layout(GettingStarted);

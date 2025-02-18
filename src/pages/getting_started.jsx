//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Layout from "@/comps/layout.jsx";
import IconAndName from "@/comps/IconAndName/IconAndName";
import { GiSolderingIron } from "react-icons/gi";
import { MdOutlineWavingHand } from "react-icons/md";
import { BsPrinterFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { RxDiscordLogo } from "react-icons/rx";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { GiSwipeCard } from "react-icons/gi";
import Alert from "@mui/material/Alert";

function GettingStarted({ new_members, returning_members }) {
  return (
    <div className="min-h-screen">
      <div>
        <h1 className="m-5">Getting Started:</h1>
        <p className="text-left m-5">
          Below is a list of options for you to engage with our lab. Select one
          to get started!
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <IconAndName
          icon={<MdOutlineWavingHand> </MdOutlineWavingHand>}
          title="Getting Started: New Members"
          buttonTitle="Click here to begin"
          color="#f9f9f9"
        >
          <Alert severity="info">
            If you need help with any of this process, please don't hesitate to
            come into the lab and ask for help! Or reach out to leadership through
            the Discord!
          </Alert>
          <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>
            {new_members}
          </ReactMarkdown>
        </IconAndName>

        <IconAndName
          icon={<GiReturnArrow> </GiReturnArrow>}
          title="Returning Members"
          buttonTitle="Click here to begin"
          color="#f9f9f9"
        >
          <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>
            {returning_members}
          </ReactMarkdown>
        </IconAndName>
        <IconAndName
          href="https://discord.gg/DjFCeQEMmE"
          icon={<RxDiscordLogo> </RxDiscordLogo>}
          title="Join our Discord"
          buttonTitle="Click here to begin"
          color="#f9f9f9"
        ></IconAndName>
        <IconAndName
          href="/soldering"
          icon={<GiSolderingIron> </GiSolderingIron>}
          title="Solder Training Information"
          buttonTitle="Click here to begin"
          color="#f9f9f9"
        ></IconAndName>
        <IconAndName
          href="https://github.com/Amp-Lab-at-VT/print-queue/issues/new?assignees=octocat&labels=3d-print&template=3d_print.yml&title=%5B3d-print%5D%3A+"
          icon={<BsPrinterFill> </BsPrinterFill>}
          title="Get Something 3D Printed"
          buttonTitle="Click here to begin"
          color="#f9f9f9"
        ></IconAndName>
        <IconAndName
          icon={<BiPurchaseTagAlt> </BiPurchaseTagAlt>}
          title="Submit a Purchase Request"
          buttonTitle="Click here to begin"
          color="#f9f9f9"
        >
          <p>
            It is now easier than ever to get what you need! Just head on over
            to the Discord, and submit your bill of materials in the{" "}
            <b>purchase request</b> channel
          </p>
        </IconAndName>
        <IconAndName
          href="/swipe-access"
          icon={<GiSwipeCard> </GiSwipeCard>}
          title="Get Lab Swipe Access"
          buttonTitle="Click here to begin"
          color="#f9f9f9"
        ></IconAndName>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const new_members_file = "new_members.md";
  const new_members = await fs.readFile(
    process.cwd() + "/docs/" + new_members_file,
    "utf8",
  );

  const returning_members_file = "returning_members.md";
  const returning_members = await fs.readFile(
    process.cwd() + "/docs/" + returning_members_file,
    "utf8",
  );

  return { props: { new_members, returning_members } };
}

export default Layout(GettingStarted);

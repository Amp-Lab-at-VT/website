//https://react-icons.github.io/react-icons/icons?name=bs
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { Alert, Container, Button, Stack, Typography } from "@mui/material";
import Layout from "@/comps/layout.jsx";

function Soldering({ fileContents }) {
  return (
    <Container>
      <Alert severity="info">
        <Stack sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography variant="h5">Want to book a solder training?</Typography>
          <Button href={"/soldering/booking"}>
            www.amp-lab.ord/soldering/booking
          </Button>
        </Stack>
      </Alert>
      <ReactMarkdown class="App-standardPage" rehypePlugins={[rehypeRaw]}>
        {fileContents}
      </ReactMarkdown>
    </Container>
  );
}

export async function getStaticProps() {
  const file = "soldering.md";
  const fileContents = await fs.readFile(
    process.cwd() + "/docs/" + file,
    "utf8",
  );
  return { props: { fileContents } };
}

export default Layout(Soldering);

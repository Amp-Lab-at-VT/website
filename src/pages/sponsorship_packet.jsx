// //https://react-icons.github.io/react-icons/icons?name=bs
// import React from "react";

// import {
//   Box,
//   Container,
//   Stack,
//   Typography,
//   Divider,
//   Paper,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
// } from "@mui/material";
// import Layout from "@/comps/layout.jsx";

// import Carousel from "react-material-ui-carousel";
// import DiamondIcon from "@mui/icons-material/Diamond";
// import GoldIcon from "@mui/icons-material/EmojiEvents";
// import SilverIcon from "@mui/icons-material/Stars";
// import BronzeIcon from "@mui/icons-material/StarOutline";

// import Level from "@/comps/Sponsorship/Level.jsx";

// // import image
// import Image from "next/image";

// function createData(description, value, cost) {
//   return { description, value, cost };
// }

// const rows = [
//   createData("Funding Student Project", "High", "$300 per project"),
//   createData("Solder Training", "High", "$50 per student"),
//   createData("3D Printer Maintenance", "Medium", "$100"),
//   createData("CNC Supplies", "Medium", "$200"),
//   createData("Lab Upkeep", "High", "$500 per semester"),
// ];

// function Sponsorship() {
//   return (
//     <Box class="App-standardPage">
//       <Container maxWidth="lg" sx={{ minHeight: "90vh", pt: "20px" }}>
//         <Typography variant="h3"> Sponsoring the Amp Lab </Typography>
//         <Divider sx={{ m: "5px" }} />
//         {/* Who are we */}
//         <Typography variant="h5"> Who are we? </Typography>
//         <Typography sx={{ ml: "20px" }} variant="body1">
//           {" "}
//           The Amp Lab is a student-run organization at Virginia Tech that aims
//           to provide students with hands-on experience with PCB design, CAD,
//           C++, and more. You name it, our students do it. That's where "Amp"
//           comes from: we amplify the skills of our members. Giving them a true
//           experience in "Autonomous Mastery Prototyping" (AMP)
//         </Typography>

//         <Divider sx={{ m: "5px" }} />
//         <Typography variant="h5"> On the Horizon </Typography>
//         <Example></Example>
//         <Divider sx={{ m: "5px" }} />

//         <Typography variant="h5"> Sponsorship Levels </Typography>
//         <Alert severity="info">
//           Note: higher tiers automatically roll in perks of lower tiers
//         </Alert>
//         <Level
//           perks={[
//             "Signage in-lab praising your sponsorship",
//             "Opportunity to suggest projects for students to collaborate and work on with the company",
//             "Private recruiting event for the company for Amp Lab students",
//           ]}
//           price={"10,000"}
//           icon={<DiamondIcon />}
//           level="Diamond"
//         ></Level>
//         <Level
//           perks={[
//             "Invitation to attend our Amp Lab sponsored recruiting event",
//             "Receive emails from us about our latest lab updates",
//           ]}
//           price={"5,000"}
//           icon={<GoldIcon />}
//           level="Gold"
//         ></Level>
//         <Level
//           perks={[
//             "Resumes from all our active members",
//             "Virtual meeting with Amp Lab leadership to thank you for your contribution",
//           ]}
//           price={"2,500"}
//           icon={<SilverIcon />}
//           level="Silver"
//         ></Level>
//         <Level
//           perks={["Recognition on our website"]}
//           price={"1,000"}
//           icon={<BronzeIcon />}
//           level="Bronze"
//         ></Level>

//         <Stack direction="row" justifyContent="center">
//           <Button href="mailto:amp-lab-leadership-team-g@vt.edu">
//             Reach out about sponsoring us now!
//           </Button>
//         </Stack>

//         <Divider sx={{ m: "20px" }} />

//         <Typography variant="h5"> Average Current Operating Costs </Typography>
//         <Divider sx={{ m: "5px" }} />
//         <Box sx={{ m: "5px" }}>
//           <BasicTable></BasicTable>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Description</TableCell>
//             <TableCell align="right">Value to Lab</TableCell>
//             <TableCell align="right">Approximate Annual Cost</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.description}
//               </TableCell>
//               <TableCell align="right">{row.value}</TableCell>
//               <TableCell align="right">{row.cost}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }



// function Example(props) {
//   var items = [
//     {
//       name: "Modernizing the Lab",
//       description:
//         "We are currently in the process of updating our lab to be more modern. We are seeking sustainable ways to keep the lab clean, organized, and safe. We are also looking to update our equipment to be more modern and efficient.",
//       image: "/Generics/Lab1.jpg",
//     },
//     {
//       name: "Updating signage to reflect sponsors",
//       description:
//         "As we encourage companies to sponsor us, we want to make sure that we are giving them the recognition they deserve. We are looking to update our signage to reflect our sponsors and their contributions to the lab.",
//     },
//     {
//       name: "Updating our website",
//       description:
//         "We are looking to update our website to be more modern and user-friendly. We want to make sure that our website is easy to navigate and provides all the information that our sponsors and students need.",
//     },
//     {
//       name: "Creating a backend for our website to make it more user-friendly",
//       description:
//         "We are looking to create a backend for our website to make it easier for our students sign up for solder training and other events, such as meet-and-greets with our sponsors",
//     },
//     {
//       name: "Amp Lab T-Shirts",
//       description:
//         "We are looking to create Amp Lab T-Shirts for our members and leadership to wear. This will help us promote the lab and our sponsors.",
//     },
//   ];

//   return (
//     <Carousel autoPlay={true} interval={6000} sx={{ mt: "10px" }}>
//       {items.map((item, i) => (
//         <Item key={i} item={item} />
//       ))}
//     </Carousel>
//   );
// }

// function Item(props) {
//   const { name, description, image } = props.item;
//   return (
//     <Paper sx={{ p: "10px", backgroundColor: "#FAFAFA" }}>
//       <Stack direction="row">
//         <Box>
//           <Typography variant="h6">{name}</Typography>
//           <Typography>{description}</Typography>
//         </Box>
//         {image && <Image src={image} alt="" width="400" height="50" />}
//       </Stack>
//     </Paper>
//   );
// }

// export default Layout(Sponsorship);


import React from "react";
import { useTheme } from "@mui/material";
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Paper,
  Alert,
  Card,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Fade,
} from "@mui/material";

import Layout from "@/comps/layout.jsx";
import Carousel from "react-material-ui-carousel";

import DiamondIcon from "@mui/icons-material/Diamond";
import GoldIcon from "@mui/icons-material/EmojiEvents";
import SilverIcon from "@mui/icons-material/Stars";
import BronzeIcon from "@mui/icons-material/StarOutline";

import Level from "@/comps/Sponsorship/Level.jsx";
import Image from "next/image";

function Sponsorship() {
  const theme = useTheme();

  return (
    <Container>
      <div className="App-pageHelper">

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
            Sponsoring the AMP Lab
          </Typography>
        </Box>

        {/* WHO WE ARE */}
        <Typography variant="h4" sx={{ mb: 1 }}>
          Who are we?
        </Typography>
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1">
            The AMP Lab is a student-run organization at Virginia Tech focused on
            hands-on engineering experience in PCB design, CAD, programming, and prototyping.
            The AMP Lab amplifies student skills through real engineering projects
            in hardware and software development.
          </Typography>
        </Card>
        <Divider sx={{ my: 4 }} />

        {/* ON THE HORIZON */}
        <Typography variant="h4" sx={{ mb: 1 }}>
          On the Horizon
        </Typography>
        <Example />

        {/* COSTS */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" sx={{ mb: 2 }}>
          Operating Costs
        </Typography>
        <BasicTable />
        <Divider sx={{ my: 4 }} />

        {/* SPONSORSHIP LEVELS */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          Sponsorship Levels
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Higher tiers include all benefits from lower tiers.
        </Alert>

        <Stack spacing={2}>
          <Level
            level="Diamond"
            price="10,000"
            icon={<DiamondIcon />}
            perks={[
              "Lab signage recognition",
              "Project collaboration opportunities",
              "Private recruiting event",
            ]}
          />

          <Level
            level="Gold"
            price="5,000"
            icon={<GoldIcon />}
            perks={[
              "Invitation to recruiting events",
              "Lab update emails",
            ]}
          />

          <Level
            level="Silver"
            price="2,500"
            icon={<SilverIcon />}
            perks={[
              "Resume access from members",
              "Leadership thank-you meeting",
            ]}
          />

          <Level
            level="Bronze"
            price="1,000"
            icon={<BronzeIcon />}
            perks={["Website recognition"]}
          />
        </Stack>

        {/* CONTACT */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            href="mailto:amp-lab-leadership-team-g@vt.edu"
          >
            Contact Us About Sponsorship
          </Button>
        </Box>



      </div>
    </Container>
  );
}

/* ---------------- TABLE ---------------- */

function createData(description, value, cost) {
  return { description, value, cost };
}

const rows = [
  createData("Funding Student Project", "High", "$300 per project"),
  createData("Solder Training", "High", "$50 per student"),
  createData("3D Printer Maintenance", "Medium", "$100"),
  createData("CNC Supplies", "Medium", "$200"),
  createData("Lab Upkeep", "High", "$500 per semester"),
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Value to Lab</TableCell>
            <TableCell align="right">Approximate Annual Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ---------------- CAROUSEL ---------------- */
// // Possible examples
// // - Solder Training boards
// // - Components
// // - Organizing Components
// // - Uniform containers
// // - Signage Materials
// // - Soldering materials and tips
// // ~ AWS package
// // - Paid software for laser cutter
// // - Fume extractor/fume pump
// // - Backup 3D printer, spare parts
// // - Possible CNC Parts
// // - Batham Tools
// // - OpenAI API Tokens
// {
//   name: "Website Improvements",
//   description:
//     "We are looking to update our website to be more modern and user-friendly. We want to make sure that our website is easy to navigate and provides all the information that our sponsors and students need.",
// }
// {
//   name: "Backend Development",
//   description:
//     "We are looking to create a backend for our website to make it easier for our students sign up for solder training and other events, such as meet-and-greets with our sponsors",
// },
// {
//   name: "Sponsor Recognition",
//   description:
//     "Improving our signage to showcase our sponsors and share the impact of their support on student projects",
// },
function Example() {
  const items = [
    {
      name: "PCB Fabrication Machine",
      description:
        "Upgrading equipment and improving cleanliness, safety, and organizatioThe BotFactory SV2 is an all-in-one desktop PCB printer that enables the AMP Lab to rapidly design, print, and assemble circuit boards in-house. As a project-based lab where students frequently iterate on hardware designs, having an in-house PCB fabrication system significantly reduces turnaround time compared to outsourcing, allowing faster testing, debugging, and refinement. By combining PCB printing, multi-layer fabrication, and component placement into a single workflow, the SV2 supports more efficient prototyping and accelerates the development of student projects and research.", image: "/Generics/botfactory-sv2.png",
    },
    {
      name: "Supporting AMP Lab Design Competitions",
      description:
        "We are seeking additional sponsorship to host AMP Lab design competitions that give students the opportunity to tackle real-world engineering challenges in a hands-on environment. Events like our analog circuit design competition allow teams to design, build, and present working prototypes under time constraints, simulating the fast-paced problem solving found in industry. Sponsor support helps provide materials, prizes, and event resources while also creating valuable opportunities for companies to engage directly with talented students, build connections, and inspire the next generation of engineers.", image: "/Generics/design_comp.jpg",

    },
    {
      name: "AWS package",
      description:
        "The Bambu Lab Automatic Material System (AMS) allows a Bambu 3D printer to use up to four filament spools in a single print, enabling multi-color and multi-material printing. By connecting up to four AMS units, the printer can produce models with up to 16 different colors. For the AMP Lab, this capability supports student projects by making it easier to create more functional, visually distinct, and professional-quality prototypes without manual filament changes, helping students iterate faster and bring their designs to life more efficiently.", image: "/Generics/bambu-ams.jpg",
    },

    {
      name: "Lab Merchandise",
      description:
        "We are looking to create AMP Lab T-shirts for our members and leadership team to wear during events, workshops, outreach activities, and day-to-day work in the lab. These shirts will help build a stronger sense of community and identity among members while also increasing the lab’s visibility across campus. By featuring our sponsors on the shirts, we can recognize their support and promote the organizations that make our student projects and hands-on learning opportunities possible.", image: "/Generics/t-shirt.png",
    },
  ];

  return (
    <Carousel autoPlay interval={3000}>
      {items.map((item, i) => (
        <Fade key={i} in timeout={800}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1">{item.description}</Typography>

            {item.image && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={225}
                  style={{
                    borderRadius: "8px",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </Box>
            )}
          </Paper>

        </Fade>
      ))}
    </Carousel>
  );
}

export default Layout(Sponsorship);

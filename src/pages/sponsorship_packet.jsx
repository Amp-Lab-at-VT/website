//https://react-icons.github.io/react-icons/icons?name=bs
import React from "react";

import { Box, Container, Stack, Typography, Divider, Paper, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material"

import Carousel from 'react-material-ui-carousel'
import DiamondIcon from '@mui/icons-material/Diamond';
import GoldIcon from '@mui/icons-material/EmojiEvents';
import SilverIcon from '@mui/icons-material/Stars';
import BronzeIcon from '@mui/icons-material/StarOutline';

import Level from "@/comps/Sponsorship/Level.jsx"

// import image
import Image from 'next/image'


function createData(description, value, cost) {
  return { description, value, cost };
}

const rows = [
  createData('Funding Student Project', "High", "$300 per project"),
  createData('Solder Training', "High", "$50 per student"),
  createData('3D Printer Maintenance', "Medium", "$100"),
  createData('CNC Supplies', "Medium", "$200"),
  createData('Lab Upkeep', "High", "$500 per semester"),
];

export default function Sponsorship() {

  return (
    <Box class="App-standardPage">
      <Container maxWidth="lg" sx={{ minHeight: "90vh", pt: "20px" }}>
        <Typography variant="h3"> Sponsoring the Amp Lab </Typography>
        <Divider sx={{ m: "5px" }} />
        {/* Who are we */}
        <Typography variant="h5"> Who are we? </Typography>
        <Typography sx={{ ml: "20px" }} variant="body1"> The Amp Lab is a student-run organization at Virginia Tech
          that aims to provide students with hands-on experience with PCB design, CAD, C++, and more.
          You name it, our students do it. That's where "Amp" comes from: we amplify the skills of our members.
          Giving them a true experience in "Autonomous Mastery Prototyping" (AMP)
        </Typography>

        <Divider sx={{ m: "5px" }} />
        <Typography variant="h5"> On the Horizon </Typography>
        <Example></Example>
        <Divider sx={{ m: "5px" }} />

        <Typography variant="h5"> Sponsorship Levels </Typography>
        <Alert severity="info">Note: higher tiers automatically roll in perks of lower tiers</Alert>
        <Level perks={["Signage in-lab praising your sponsorship", "Invitations to our weekly leadership meetings"]} price={"10,000"} icon={<DiamondIcon />} level="Diamond"></Level>
        <Level perks={["Invitations to visit, meet our staff, and discuss your gift and what it means to us", "Receive emails from us about our latest lab updates"]} price={"7,500"} icon={<GoldIcon />} level="Gold"></Level>
        <Level perks={["Resumes from all our active members", "Virtual meeting with Amp Lab leadership to thank you for your contribution"]} price={"5,000"} icon={<SilverIcon />} level="Silver"></Level>
        <Level perks={["Recognition on our website"]} price={"2,500"} icon={<BronzeIcon />} level="Bronze"></Level>

        <Stack direction="row" justifyContent="center">
          <Button href="mailto:rhforsythjr@vt.edu">Reach out about sponsoring us now!</Button>
        </Stack>

        <Divider sx={{ m: "20px" }} />

        <Typography variant="h5"> Average Current Operating Costs </Typography>
        <Divider sx={{ m: "5px" }} />
        <Box sx={{ m: "5px" }}>
          <BasicTable></BasicTable>
        </Box>

      </Container>
    </Box>
  );
}

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Value to Lab</TableCell>
            <TableCell align="right">Approximate Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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

// Possible examples
// - Solder Training boards
// - Components
// - Organizing Components
// - Uniform containers
// - Signage Materials
// - Soldering materials and tips
// ~ AWS package 
// - Paid software for laser cutter
// - Fume extractor/fume pump
// - Backup 3D printer, spare parts
// - Possible CNC Parts
// - Batham Tools
// - OpenAI API Tokens

function Example(props) {
  var items = [
    {
      name: "Updating lab to be more modern",
      description: "We are currently in the process of updating our lab to be more modern. We are seeking sustainable ways to keep the lab clean, organized, and safe. We are also looking to update our equipment to be more modern and efficient.",
      image : "/Generics/Lab1.jpg"
    },
    {
      name: "Updating signage to reflect sponsors",
      description: "As we encourage companies to sponsor us, we want to make sure that we are giving them the recognition they deserve. We are looking to update our signage to reflect our sponsors and their contributions to the lab."
    },
    {
      name: "Updating our website",
      description: "We are looking to update our website to be more modern and user-friendly. We want to make sure that our website is easy to navigate and provides all the information that our sponsors and students need."
    },
    {
      name: "Creating a backend for our website to make it more user-friendly",
      description: "We are looking to create a backend for our website to make it easier for our students sign up for solder training and other events, such as meet-and-greets with our sponsors"
    },
    {
      name: "Amp Lab T-Shirts",
      description: "We are looking to create Amp Lab T-Shirts for our members and leadership to wear. This will help us promote the lab and our sponsors."
    }
  ]

  return (
    <Carousel autoPlay={true} interval={6000} sx={{ mt: "10px" }}>
      {
        items.map((item, i) => <Item key={i} item={item} />)
      }
    </Carousel>
  )
}

function Item(props) {
  const { name, description, image } = props.item;
  return (
    <Paper sx={{ p: "10px", backgroundColor: "#FAFAFA" }}>
      <Stack direction="row">
        <Box>
          <Typography variant="h6">{name}</Typography>
          <Typography>{description}</Typography>
        </Box>
        {image && <Image src={image} alt="" width = "400" height="50"/>}
      </Stack>
    </Paper>
  )
}
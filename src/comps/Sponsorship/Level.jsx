// Write me a component that renders a single sponsorship level

import React from "react";

import { Box, Container, Typography, Divider, Stack, Paper } from "@mui/material"

import DiamondIcon from '@mui/icons-material/Diamond';

export default function SponsorshipLevel(props) {

    const { level, price, perks = [], icon = null } = props;

    return (
        <Paper sx={{ mb: "5px", pt: "20px", pb: "20px" }}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>

                <Stack alignItems={"center"} justifyContent={"space-between"} sx={{ ml: "20px" }} direction="row">
                    <Box>{icon}</Box>
                    <Typography sx={{ ml: "10px" }} variant="h6"> {level} </Typography>
                </Stack>
                <Typography sx={{ mr: "10px" }} variant="h6"> ${price} </Typography>
            </Stack>
            <Divider sx={{m: "10px"}}/>
            <Typography variant="h6" sx={{ ml: "20px" }}>
                <ul>
                    {perks.map((perk) => <li> {perk} </li>)}
                </ul>
            </Typography>       
        </Paper>
    );
}
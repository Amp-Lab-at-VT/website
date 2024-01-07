// Create an iframe for a booking calendar

import React from "react"
import {Container, Stack, Alert} from "@mui/material"

const src='https://outlook.office365.com/owa/calendar/SolderingTrainings@VirginiaTech.onmicrosoft.com/bookings/'


import { Container, Stack } from "@mui/material";

export default function Booking() {

    // todo: attempt to connect to microsoft account
    // if not connected, display alert

    return (
        <Container >
            <Stack justifyContent="center">
                <Alert severity  = "warning">You must be logged into your Microsoft account to access. If the application doesn't load, please log into your Microsoft account separately and return to this page</Alert>
                <iframe style= {{ height: "90vh", border: "none"}}
                src={src}
                ></iframe>
            </Stack>
        </Container>
    )
    }

// Create an iframe for a booking calendar

import React from "react";

import { Container, Stack } from "@mui/material";

export default function Booking() {
  return (
    <Container>
      <Stack justifyContent="center">
        <iframe
          style={{ height: "90vh", border: "none" }}
          src="https://outlook.office365.com/owa/calendar/SolderingTrainings@VirginiaTech.onmicrosoft.com/bookings/"
        ></iframe>
      </Stack>
    </Container>
  );
}

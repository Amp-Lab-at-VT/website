// Create an iframe for a booking calendar
import { Alert, Container, Stack } from "@mantine/core";

const src =
    "https://outlook.office365.com/owa/calendar/SolderingTrainings@VirginiaTech.onmicrosoft.com/bookings/";

export default function Booking() {
    // todo: attempt to connect to microsoft account
    // if not connected, display alert

    return (
        <Container>
            <Stack justify="center">
                <Alert>
                    {`You must be logged into your Microsoft account to access. If
                    the application doesn't load, please log into your Microsoft
                    account separately and return to this page`}
                </Alert>
                <iframe
                    title={"Book your Training Session"}
                    style={{ height: "90vh", border: "none" }}
                    src={src}
                >
                </iframe>
            </Stack>
        </Container>
    );
}

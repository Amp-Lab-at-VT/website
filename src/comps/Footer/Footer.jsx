import Link from "next/link";
import { Box, Typography, List, ListItem } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        borderTop: "1px solid #ddd",
        padding: "20px",
        color: "red", // Set all text color to red
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box flex={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            About Us
          </Typography>
          <Typography variant="body2">
            We are a lab committed to getting students active in design.
          </Typography>
        </Box>

        <Box flex={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Important Links
          </Typography>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ padding: 0, marginBottom: "5px" }}>
              <Link href="/getting_started" style={{ textDecoration: "none" }}>
                <Typography variant="body2">
                  Getting Started
                </Typography>
              </Link>
            </ListItem>
            <ListItem sx={{ padding: 0, marginBottom: "5px" }}>
              <Link href="/Leadership" style={{ textDecoration: "none" }}>
                <Typography variant="body2">
                  Leadership
                </Typography>
              </Link>
            </ListItem>
          </List>
        </Box>

        <Box flex={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Location
          </Typography>
          <Typography variant="body2">1185 Perry St</Typography>
          <Typography variant="body2">Blacksburg, VA 24060</Typography>
          <Typography variant="body2">Room 236</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

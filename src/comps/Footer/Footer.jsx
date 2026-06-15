import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Container,
  Divider,
  useTheme,
} from "@mui/material";

import {
  GitHub,
  LocationOn,
  School,
  Build
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 6,

        // ✅ YOUR REQUESTED COLORS
        backgroundColor: isDark ? "#000000" : "#b91c1c",

        // IMPORTANT: force text color globally
        color: isDark ? "#d1d5db" : "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* About */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#ffffff", // force white title
              }}
            >
              <Build />
              About AMP Lab
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                color: isDark ? "#d1d5db" : "#ffffff",
                opacity: 1, // ❌ remove fading
              }}
            >
              We are a student-run lab committed to getting students active in design,
              innovation, and hands-on learning within the ECE department at Virginia Tech.
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href="https://github.com/Amp-Lab-at-VT/website"
                target="_blank"
                sx={{
                  color: "#ffffff",
                }}
              >
                <GitHub />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#ffffff",
              }}
            >
              <School />
              Quick Links
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "Getting Started", href: "/getting_started" },
                { label: "Projects", href: "/projects" },
                { label: "Leadership", href: "/Leadership" },
                { label: "Resources", href: "/resources" },
                { label: "Documentation", href: "/documentation" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? "#d1d5db" : "#ffffff",
                      opacity: 1,
                      "&:hover": {
                        opacity: 0.8,
                        transform: "translateX(4px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Location */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#ffffff",
              }}
            >
              <LocationOn />
              Visit Us
            </Typography>

            <Typography sx={{ color: isDark ? "#d1d5db" : "#ffffff", mb: 1 }}>
              Electrical & Computer Engineering
            </Typography>
            <Typography sx={{ color: isDark ? "#d1d5db" : "#ffffff", mb: 1 }}>
              Virginia Tech
            </Typography>
            <Typography sx={{ color: isDark ? "#d1d5db" : "#ffffff", mb: 1 }}>
              Whittemore Hall
            </Typography>
            <Typography sx={{ color: isDark ? "#d1d5db" : "#ffffff", mb: 1 }}>
              1185 Perry St, Room 236
            </Typography>
            <Typography sx={{ color: isDark ? "#d1d5db" : "#ffffff" }}>
              Blacksburg, VA 24060
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            my: 4,
            borderColor: isDark ? "#374151" : "rgba(255,255,255,0.3)"
          }}
        />

        {/* Bottom row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
            color: isDark ? "#9ca3af" : "#ffffff",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} AMP Lab at Virginia Tech
          </Typography>
          <Typography variant="body2">
            Built with ❤️ by AMP Lab students
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

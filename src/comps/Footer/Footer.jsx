import Link from "next/link";
import { 
  Box, 
  Typography, 
  Grid, 
  IconButton, 
  Container,
  Divider,
  useTheme,
  alpha
} from "@mui/material";
import { 
  GitHub, 
  LocationOn, 
  School, 
  Build 
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        color: theme.palette.mode === 'light' ? '#ffffff' : theme.palette.text.primary,
        mt: "auto",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
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
                opacity: 0.9
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
                rel="noopener noreferrer"
                sx={{
                  color: "inherit",
                  backgroundColor: alpha('#ffffff', 0.1),
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.2),
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
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
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      opacity: 0.8,
                      '&:hover': { 
                        opacity: 1,
                        transform: 'translateX(4px)',
                      },
                      transition: 'all 0.2s ease-in-out',
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
              }}
            >
              <LocationOn />
              Visit Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
              Electrical & Computer Engineering
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
              Virginia Tech
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
              1185 Perry St, Room 236
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Blacksburg, VA 24060
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: alpha('#ffffff', 0.2) }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} AMP Lab at Virginia Tech. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Built with ❤️ by AMP Lab students
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

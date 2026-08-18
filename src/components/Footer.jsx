import { Box, Container, Typography, Link, IconButton, Divider, Stack, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper', 
        color: 'text.primary', 
        pt: 8, 
        pb: 4,
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand and About */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: '-0.02em',
                mb: 2
              }}
            >
              Shop<span style={{ color: '#fff' }}>Easy</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: '300px', lineHeight: 1.7 }}>
              Your ultimate destination for premium electronics, fashion, and home essentials. We deliver quality and style right to your doorstep.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.1)' } }}>
                <Facebook size={18} />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.1)' } }}>
                <Instagram size={18} />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.1)' } }}>
                <Twitter size={18} />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.1)' } }}>
                <Github size={18} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Shop
            </Typography>
            <Stack spacing={1.5}>
              <Link component={RouterLink} to="/products" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>All Products</Link>
              <Link component={RouterLink} to="/products?category=Electronics" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Electronics</Link>
              <Link component={RouterLink} to="/products?category=Fashion" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Fashion</Link>
              <Link component={RouterLink} to="/products?category=Home" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Home & Living</Link>
            </Stack>
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Support
            </Typography>
            <Stack spacing={1.5}>
              <Link component={RouterLink} to="/about" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>About Us</Link>
              <Link component={RouterLink} to="/contact" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Contact Us</Link>
              <Link href="#" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>Track Order</Link>
              <Link href="#" color="text.secondary" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>FAQs</Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Contact Us
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <MapPin size={20} className="text-indigo-500" />
                <Typography variant="body2" color="text.secondary">
                  123 Commerce Avenue, Digital City, 10101
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Phone size={20} className="text-indigo-500" />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 000-1234
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Mail size={20} className="text-indigo-500" />
                <Typography variant="body2" color="text.secondary">
                  support@shopeasy.com
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 8, mb: 4, borderColor: 'rgba(255,255,255,0.05)' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ShopEasy. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.75rem', '&:hover': { color: 'primary.main' } }}>Privacy Policy</Link>
            <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.75rem', '&:hover': { color: 'primary.main' } }}>Terms of Service</Link>
            <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.75rem', '&:hover': { color: 'primary.main' } }}>Cookie Policy</Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

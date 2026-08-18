import { Box, Container, Typography, Grid, TextField, Button, Paper, Stack, IconButton } from "@mui/material";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import PageTitle from "../components/PageTitle";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.", {
      position: "bottom-center"
    });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: "Email Us",
      value: "support@shopeasy.com",
      color: "#6366f1"
    },
    {
      icon: <Phone size={24} />,
      label: "Call Us",
      value: "+1 (555) 000-1234",
      color: "#ec4899"
    },
    {
      icon: <MapPin size={24} />,
      label: "Visit Us",
      value: "123 Commerce Ave, Digital City, 10101",
      color: "#6366f1"
    }
  ];

  return (
    <Box sx={{ pb: 10 }}>
      <PageTitle title="Contact Us - ShopEasy" />

      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'background.paper', 
          py: { xs: 8, md: 12 },
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 10
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={800} gutterBottom sx={{ letterSpacing: '-0.02em' }}>
              Get in Touch
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: '600px', mx: 'auto' }}>
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h4" fontWeight={800} gutterBottom sx={{ mb: 4 }}>
              Contact Information
            </Typography>
            
            <Stack spacing={4} sx={{ mb: 6 }}>
              {contactInfo.map((info, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: 3, 
                      bgcolor: `${info.color}15`, 
                      color: info.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {info.label}
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {info.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <IconButton 
                  key={i}
                  sx={{ 
                    bgcolor: 'background.paper', 
                    border: '1px solid', 
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': { 
                      color: 'primary.main', 
                      borderColor: 'primary.main',
                      bgcolor: 'primary.main' + '10'
                    } 
                  }}
                >
                  <Icon size={20} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 4, md: 6 }, 
                borderRadius: 4, 
                bgcolor: 'background.paper', 
                border: '1px solid', 
                borderColor: 'divider' 
              }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>
                Send us a Message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      required
                      sx={{ bgcolor: 'background.default' }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      required
                      sx={{ bgcolor: 'background.default' }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      required
                      sx={{ bgcolor: 'background.default' }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={6}
                      required
                      sx={{ bgcolor: 'background.default' }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth 
                      type="submit"
                      startIcon={<Send size={18} />}
                      sx={{ 
                        py: 2, 
                        fontWeight: 700,
                        fontSize: '1rem',
                        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;

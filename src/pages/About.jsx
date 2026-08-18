import { Box, Container, Typography, Grid, Paper, Stack, Fade } from "@mui/material";
import { Users, Target, Shield, Zap } from "lucide-react";
import PageTitle from "../components/PageTitle";

const About = () => {
  const values = [
    {
      icon: <Users size={32} />,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else."
    },
    {
      icon: <Target size={32} />,
      title: "Quality Driven",
      description: "Every product in our catalog undergoes rigorous quality checks."
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Shopping",
      description: "Your data and transactions are protected by industry-leading security."
    },
    {
      icon: <Zap size={32} />,
      title: "Fast Delivery",
      description: "We ensure your products reach you as quickly and safely as possible."
    }
  ];

  return (
    <Box sx={{ pb: 10 }}>
      <PageTitle title="About Us - ShopEasy" />

      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          mb: 10
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            opacity: 0.1,
            background: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%)'
          }} 
        />
        <Container maxWidth="md">
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <Typography variant="h2" fontWeight={800} gutterBottom sx={{ letterSpacing: '-0.02em' }}>
                Redefining the Future of Online Shopping
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, maxWidth: '700px', mx: 'auto' }}>
                We're on a mission to provide the best products with an unparalleled shopping experience.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Our Story */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: 12 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" fontWeight={800} gutterBottom color="primary.main">
              Our Story
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Founded in 2024, ShopEasy started with a simple idea: making high-quality products accessible to everyone, everywhere. What began as a small project has now grown into a leading e-commerce platform trusted by thousands of customers.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              We believe that shopping should be more than just a transaction; it should be an experience. That's why we meticulously curate our collection, focusing on innovation, style, and durability.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              sx={{ 
                width: '100%', 
                height: 400, 
                bgcolor: 'background.paper', 
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
              }}
            >
              <Box 
                sx={{ 
                  width: '60%', 
                  height: '60%', 
                  bgcolor: 'primary.main', 
                  opacity: 0.1, 
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', 
                  filter: 'blur(40px)',
                  position: 'absolute',
                  animation: 'morph 10s linear infinite alternate'
                }} 
              />
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <Zap size={80} strokeWidth={1} style={{ color: '#6366f1', opacity: 0.5, marginBottom: '1rem' }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Innovation in E-Commerce
                </Typography>
              </Box>
              <style>
                {`
                  @keyframes morph {
                    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                    100% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
                  }
                `}
              </style>
            </Box>
          </Grid>
        </Grid>

        {/* Our Values */}
        <Box sx={{ mb: 12, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Our Core Values
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
            The principles that guide everything we do.
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Fade in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      textAlign: 'center',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-8px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;

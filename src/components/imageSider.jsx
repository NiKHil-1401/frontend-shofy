import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Fade, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "./images/R1.png",
    title: "Premium Sound",
    subtitle: "Experience music like never before with our high-end headphones collection.",
    buttonText: "Shop Audio",
    color: "#6366f1"
  },
  {
    image: "./images/R2.png",
    title: "Smart Living",
    subtitle: "Discover the latest in smart home technology for a more connected life.",
    buttonText: "Explore Tech",
    color: "#ec4899"
  },
  {
    image: "./images/R3.png",
    title: "Timeless Style",
    subtitle: "Luxury watches that combine precision engineering with elegant design.",
    buttonText: "View Watches",
    color: "#10b981"
  },
  {
    image: "./images/R4.png",
    title: "Powerful Performance",
    subtitle: "The latest laptops and computing accessories for work and play.",
    buttonText: "Upgrade Now",
    color: "#f59e0b"
  },
  {
    image: "./images/R5.png",
    title: "Capture Every Moment",
    subtitle: "Professional grade cameras for photography enthusiasts and pros.",
    buttonText: "Buy Cameras",
    color: "#3b82f6"
  }
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 450, md: 650 },
        overflow: "hidden",
        bgcolor: '#0f172a'
      }}
    >
      {slides.map((slide, index) => (
        <Fade in={index === currentIndex} timeout={1000} key={index}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: index === currentIndex ? "block" : "none",
            }}
          >
            {/* Background Image with Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.1) 100%)',
                }
              }}
            />

            {/* Content */}
            <Container maxWidth="xl" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
              <Box 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  maxWidth: { xs: '100%', md: '50%' }
                }}
              >
                <Fade in={index === currentIndex} timeout={1500} style={{ transitionDelay: '200ms' }}>
                    <Typography 
                        component="span" 
                        sx={{ 
                            color: slide.color, 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            letterSpacing: 2,
                            fontSize: '0.875rem',
                            mb: 2,
                            display: 'block'
                        }}
                    >
                        New Arrival
                    </Typography>
                </Fade>

                <Fade in={index === currentIndex} timeout={1500} style={{ transitionDelay: '400ms' }}>
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontWeight: 800, 
                            color: 'white',
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            lineHeight: 1.1,
                            mb: 2,
                            letterSpacing: '-0.03em'
                        }}
                    >
                        {slide.title}
                    </Typography>
                </Fade>

                <Fade in={index === currentIndex} timeout={1500} style={{ transitionDelay: '600ms' }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: 'text.secondary',
                            fontWeight: 400,
                            mb: 4,
                            maxWidth: '90%'
                        }}
                    >
                        {slide.subtitle}
                    </Typography>
                </Fade>

                <Fade in={index === currentIndex} timeout={1500} style={{ transitionDelay: '800ms' }}>
                    <Box>
                        <Button 
                            variant="contained" 
                            size="large"
                            sx={{ 
                                bgcolor: slide.color,
                                '&:hover': { bgcolor: slide.color, opacity: 0.9 },
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem'
                            }}
                        >
                            {slide.buttonText}
                        </Button>
                    </Box>
                </Fade>
              </Box>
            </Container>
          </Box>
        </Fade>
      ))}

      {/* Navigation Arrows */}
      <IconButton 
        onClick={handlePrev}
        sx={{ 
            position: 'absolute', 
            left: 20, 
            top: '50%', 
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
        }}
      >
        <ChevronLeft size={24} />
      </IconButton>

      <IconButton 
        onClick={handleNext}
        sx={{ 
            position: 'absolute', 
            right: 20, 
            top: '50%', 
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
        }}
      >
        <ChevronRight size={24} />
      </IconButton>

      {/* Indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.75rem",
          zIndex: 2
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: index === currentIndex ? 32 : 10,
              height: 10,
              backgroundColor: index === currentIndex ? slides[index].color : "rgba(255, 255, 255, 0.2)",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;

import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

const Loader = () => {
  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
          bgcolor: 'background.default',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
          <CircularProgress 
            size={80} 
            thickness={2} 
            sx={{ color: 'rgba(255,255,255,0.05)' }} 
            variant="determinate" 
            value={100} 
          />
          <CircularProgress
            size={80}
            thickness={2}
            sx={{
              color: 'primary.main',
              position: 'absolute',
              left: 0,
              animationDuration: '1s',
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
             <Typography
              variant="caption"
              component="div"
              sx={{ color: 'primary.main', fontWeight: 800, fontSize: '0.75rem' }}
            >
              Shop
            </Typography>
          </Box>
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.primary', 
            fontWeight: 700, 
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.8
          }}
        >
          Loading...
        </Typography>
      </Box>
    </Fade>
  );
};

export default Loader;

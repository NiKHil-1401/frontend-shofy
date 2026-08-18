import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

const NoProducts = ({ message }) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          py: 8
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 100,
            height: 100,
            bgcolor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            border: '1px solid',
            borderColor: 'primary.main',
          }}
        >
          <ShoppingCart size={40} className="text-indigo-500" />
        </Paper>
        
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
          Oops! Nothing Found
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 5, maxWidth: 500, mx: 'auto', fontWeight: 400 }}>
          {message || "We couldn't find what you're looking for. Try adjusting your search or filters."}
        </Typography>
        
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          startIcon={<ArrowLeft size={20} />}
          sx={{ px: 4, py: 1.5, borderRadius: 3 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NoProducts;

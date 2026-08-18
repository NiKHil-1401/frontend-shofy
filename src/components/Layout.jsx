import React from 'react';
import { Box } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, md: 10 } }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

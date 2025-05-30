import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Sidebar from './Sidebar';

const SIDEBAR_WIDTH = 240;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'row' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          bgcolor: 'primary.main',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Container component="main" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 
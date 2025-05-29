import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import DietPlanGenerator from '../components/DietPlanGenerator';

const Home = () => {
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Market Plan
        </Typography>
        <Typography variant="body1" paragraph>
          Your journey to a sustainable lifestyle starts here. Get your personalized diet plan based on your preferences and goals.
        </Typography>
      </Paper>
      
      <DietPlanGenerator />
    </Box>
  );
};

export default Home; 
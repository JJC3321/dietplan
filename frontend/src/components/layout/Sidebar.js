import React from 'react';
import { Box, Avatar, Typography, Button, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Avatar
        sx={{ width: 140, height: 140, mb: 2 }}
        src="/profile.jpg"
      />
      <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 500 }}>
        Roshan Sharma
      </Typography>
      <Stack spacing={2} width="100%">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonIcon />}
          sx={{ borderRadius: 4, width: '100%' }}
          onClick={() => navigate('/')}
        >
          Personal Information
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<RestaurantIcon />}
          sx={{ borderRadius: 4, width: '100%' }}
          onClick={() => navigate('/meal-plan')}
        >
          Meal Plan
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<BookmarkIcon />}
          sx={{ borderRadius: 4, width: '100%' }}
        >
          Saved
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<HelpIcon />}
          sx={{ borderRadius: 4, width: '100%' }}
        >
          Help
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar; 
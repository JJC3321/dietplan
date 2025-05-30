import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import GroceryMap from '../components/GroceryMap';
import MealPlanDisplay from '../components/MealPlanDisplay';

const MealPlan = () => {
  const [days, setDays] = useState([
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]);
  const [meals, setMeals] = useState([
    { title: 'Breakfast', content: 'pancakes, milk' },
    { title: 'Lunch', content: '' },
    { title: 'Dinner', content: '' },
  ]);

  useEffect(() => {
    const storedMeals = localStorage.getItem('mealPlan');
    const storedDays = localStorage.getItem('mealPlanDays');
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    }
    if (storedDays) {
      setDays(JSON.parse(storedDays));
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '80vh' }}>
      {/* Map Section */}
      <Box sx={{ flex: 1, minWidth: 350, maxWidth: 500, height: '80vh' }}>
        <GroceryMap style={{ height: '100%', width: '100%' }} />
      </Box>
      {/* Meal Plan Section */}
      <Box sx={{ flex: 1.2, bgcolor: '#8000b3', color: '#fff', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: '80vh', position: 'relative' }}>
        <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 600, letterSpacing: 2 }}>
          MEAL PLAN
        </Typography>
        <Box sx={{ borderTop: '1px solid #fff', mb: 2 }} />
        <Box sx={{ flex: 1, overflowY: 'auto', pr: 2 }}>
          <MealPlanDisplay days={days} meals={meals} />
        </Box>
        <Button variant="text" sx={{ color: '#fff', fontSize: 20, position: 'absolute', right: 32, bottom: 24, letterSpacing: 2 }}>
          SAVE
        </Button>
      </Box>
    </Box>
  );
};

export default MealPlan; 
import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MealPlanDisplay = ({ days = [], meals = [], sx = {} }) => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [mealIndex, setMealIndex] = useState(0);

  const handleAccordionChange = (day) => (event, isExpanded) => {
    setExpandedDay(isExpanded ? day : null);
    setMealIndex(0); // Reset meal index when switching days
  };

  const handlePrevMeal = () => {
    setMealIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextMeal = () => {
    setMealIndex((prev) => (prev < meals.length - 1 ? prev + 1 : prev));
  };

  return (
    <Box sx={sx}>
      {meals && meals.length > 0 ? (
        days.map((day, i) => (
          <Accordion
            key={day}
            expanded={expandedDay === day}
            onChange={handleAccordionChange(day)}
            sx={{ bgcolor: 'primary.main', color: '#fff', mb: 1, boxShadow: 0 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
              <Typography sx={{ fontWeight: 500 }}>{day}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expandedDay === day && meals[mealIndex] && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton onClick={handlePrevMeal} disabled={mealIndex === 0} sx={{ color: '#fff' }}>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <Box sx={{ mx: 2, minWidth: 200 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'secondary.light' }}>
                      {meals[mealIndex].title}
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: '#fff' }}>
                      {meals[mealIndex].content}
                    </Typography>
                  </Box>
                  <IconButton onClick={handleNextMeal} disabled={mealIndex === meals.length - 1} sx={{ color: '#fff' }}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2" color="#fff">
          [Meal plan display will go here]
        </Typography>
      )}
    </Box>
  );
};

export default MealPlanDisplay; 
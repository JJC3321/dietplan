import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import axios from 'axios';

const DietPlanGenerator = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    dietaryRestrictions: '',
    goals: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [meals, setMeals] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const parseDishes = (plan) => {
    // Split by 'Dish Name:' and filter out empty results
    const dishSections = plan.split(/\n?Dish Name:/).filter(Boolean);
    return dishSections.map((section, index) => {
      // The first line is the dish name, the rest is content
      const [nameLine, ...contentLines] = section.trim().split('\n');
      
      // Extract total calories and cost
      const totalCaloriesMatch = contentLines.join('\n').match(/Total Calories: (\d+)/);
      const totalCostMatch = contentLines.join('\n').match(/Total Cost: \$([\d.]+)/);
      
      return {
        title: `Meal ${index + 1}: ${nameLine.trim()}`,
        content: contentLines.join('\n').trim(),
        totalCalories: totalCaloriesMatch ? totalCaloriesMatch[1] : 'N/A',
        totalCost: totalCostMatch ? `$${totalCostMatch[1]}` : 'N/A'
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDietPlan(null);
    setActiveStep(0);

    try {
      const prompt = `Create a personalized diet plan for a person with the following characteristics:
        Age: ${formData.age}
        Weight: ${formData.weight}
        Height: ${formData.height}
        Activity Level: ${formData.activityLevel}
        Dietary Restrictions: ${formData.dietaryRestrictions}
        Goals: ${formData.goals}
        Additional Comments: ${formData.comment}`;

      const response = await axios.post('http://localhost:8000/generate', {
        prompt: prompt,
      });

      setDietPlan(response.data.response);
      setMeals(parseDishes(response.data.response));
    } catch (err) {
      setError('Failed to generate diet plan. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, meals.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} alignItems="flex-start">
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generate Your Personalized Diet Plan
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'grid', gap: 2 }}>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ height: 56, minHeight: 56, maxHeight: 56 }}
                />
                <TextField
                  label="Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  fullWidth
                  helperText={'Enter weight with unit: e.g., 150 lb or 68 kg'}
                  sx={{ height: 70, minHeight: 70, maxHeight: 70 }}
                />
                <TextField
                  label="Height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  fullWidth
                  helperText={'Enter height in either format: 5\'11" (feet and inches) or 180 cm'}
                  sx={{ height: 70, minHeight: 70, maxHeight: 70 }}
                />
                <TextField
                  label="Activity Level"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  required
                  fullWidth
                  helperText="e.g., Sedentary, Lightly Active, Moderately Active, Very Active"
                  sx={{ height: 70, minHeight: 70, maxHeight: 70 }}
                />
                <TextField
                  label="Dietary Restrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  fullWidth
                  helperText="e.g., Vegetarian, Vegan, Gluten-free, etc."
                  sx={{ height: 70, minHeight: 70, maxHeight: 70 }}
                />
                <TextField
                  label="Goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  required
                  fullWidth
                  helperText="e.g., Weight loss, Muscle gain, Maintenance"
                  sx={{ height: 70, minHeight: 70, maxHeight: 70 }}
                />
                <TextField
                  label="Additional Comments"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  helperText="Share your cultural dish preferences, food likes/dislikes, or any other comments"
                  sx={{ height: 120, minHeight: 120, maxHeight: 120 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Generate Diet Plan'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {dietPlan && (
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handleBack} disabled={activeStep === 0}>
                  <ChevronLeft />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                  {meals[activeStep]?.title || 'Your Diet Plan'}
                </Typography>
                <IconButton onClick={handleNext} disabled={activeStep === meals.length - 1}>
                  <ChevronRight />
                </IconButton>
              </Box>
              
              <Box
                sx={{
                  flexGrow: 1,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {meals.map((meal, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      transform: `translateX(${(index - activeStep) * 100}%)`,
                      transition: 'transform 0.3s ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        flexGrow: 1,
                        overflow: 'auto',
                      }}
                    >
                      {meal.content}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DietPlanGenerator; 
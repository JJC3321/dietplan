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
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SpaIcon from '@mui/icons-material/Spa';
import SetMealIcon from '@mui/icons-material/SetMeal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GroceryMap from './GroceryMap';
import MealPlanDisplay from './MealPlanDisplay';

// Fix default marker icon issue in leaflet
import 'leaflet/dist/leaflet.css';
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const dietOptions = [
  { label: 'None', icon: <RestaurantIcon /> },
  { label: 'Vegan', icon: <LocalFloristIcon /> },
  { label: 'Vegetarian', icon: <SpaIcon /> },
  { label: 'Pescatarian', icon: <SetMealIcon /> },
];

const frequencyOptions = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'All Day', value: 'all' },
];

const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const dietDescriptions = {
  Normal: "No dietary restrictions.",
  Vegan: "Excludes all animal products.",
  Vegetarian: "Excludes meat and fish, but may include animal products",
  Pescatarian: "Excludes meat but includes seafood.",
};

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
  const [diet, setDiet] = useState('Normal');
  const [frequency, setFrequency] = useState('all');

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
      // Save meal plan and form data to localStorage
      localStorage.setItem('mealPlan', JSON.stringify(parseDishes(response.data.response)));
      localStorage.setItem('mealPlanDays', JSON.stringify(daysOfWeek));
      localStorage.setItem('personalInfo', JSON.stringify(formData));
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
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 2 }}>
      <Grid container spacing={4}>
        {/* Profile Details Form (center/left) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'background.default',
            boxShadow: 3,
          }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Personal Information
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
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
                <TextField
                  label="Height (feet, inches)"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
                <TextField
                  label="Weight (lbs)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
                <TextField
                  label="Activity Level"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  fullWidth
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
                <TextField
                  label="Goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  fullWidth
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
                <TextField
                  label="Comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={2}
                  sx={{ bgcolor: '#fff', borderRadius: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 2, borderRadius: 3 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* Map and Meal Plan (right) */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Diet & Frequency Selection Panel */}
            <Paper elevation={2} sx={{ borderRadius: 4, bgcolor: 'primary.main', color: '#fff', p: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#fff', textAlign: 'center' }}>
                Dietary Restrictions
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                {dietOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    variant={diet === opt.label ? 'contained' : 'outlined'}
                    onClick={() => setDiet(opt.label)}
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                      bgcolor: diet === opt.label ? 'secondary.main' : 'primary.main',
                      minWidth: 64,
                      borderRadius: 2,
                      flexDirection: 'column',
                      py: 1.5,
                      '&:hover': { bgcolor: 'secondary.main', borderColor: '#fff' },
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {opt.icon}
                      <Typography variant="caption" sx={{ color: '#fff', mt: 0.5 }}>
                        {opt.label}
                      </Typography>
                    </Box>
                  </Button>
                ))}
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#fff', textAlign: 'center', mb: 2, minHeight: 24 }}
              >
                {dietDescriptions[diet]}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, textAlign: 'center' }}>
                FREQUENCY
              </Typography>
              <ToggleButtonGroup
                value={frequency}
                exclusive
                onChange={(_, val) => val && setFrequency(val)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
                  border: '1px solid #fff',
                }}
              >
                {frequencyOptions.map((opt, idx) => (
                  <ToggleButton
                    key={opt.value}
                    value={opt.value}
                    sx={{
                      color: '#fff',
                      bgcolor: frequency === opt.value ? 'secondary.main' : 'primary.main',
                      border: 'none',
                      borderRadius: 0,
                      px: 4,
                      '&:first-of-type': { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
                      '&:last-of-type': { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
                      '&.Mui-selected': { bgcolor: 'secondary.main', color: '#fff' },
                      '&:hover': { bgcolor: 'secondary.main' },
                      minWidth: 0,
                    }}
                  >
                    {opt.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DietPlanGenerator; 
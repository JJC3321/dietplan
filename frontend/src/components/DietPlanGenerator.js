import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const DietPlanGenerator = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    dietaryRestrictions: '',
    goals: '',
  });
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDietPlan(null);

    try {
      const prompt = `Create a personalized diet plan for a person with the following characteristics:
        Age: ${formData.age}
        Weight: ${formData.weight} kg
        Height: ${formData.height} cm
        Activity Level: ${formData.activityLevel}
        Dietary Restrictions: ${formData.dietaryRestrictions}
        Goals: ${formData.goals}`;

      const response = await axios.post('http://localhost:8000/generate', {
        prompt: prompt,
      });

      setDietPlan(response.data.response);
    } catch (err) {
      setError('Failed to generate diet plan. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
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
            />
            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Activity Level"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
              fullWidth
              helperText="e.g., Sedentary, Lightly Active, Moderately Active, Very Active"
            />
            <TextField
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              fullWidth
              helperText="e.g., Vegetarian, Vegan, Gluten-free, etc."
            />
            <TextField
              label="Goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
              fullWidth
              helperText="e.g., Weight loss, Muscle gain, Maintenance"
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {dietPlan && (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Personalized Diet Plan
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {dietPlan}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default DietPlanGenerator; 
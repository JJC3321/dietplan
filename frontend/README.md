# Frontend

This is the frontend application for the Diet Plan Generator, built with React and Material-UI. It provides a modern, responsive interface for generating and viewing personalized diet plans.

## Features

- Modern, responsive UI built with Material-UI
- Interactive diet plan generation
- Real-time API integration with backend
- Map integration for location-based features
- Swipeable views for mobile-friendly navigation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Dependencies

### Core Dependencies
- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.22.1
- Axios 1.6.7

### UI Components
- Material-UI (MUI) 5.15.10
  - @emotion/react 11.11.3
  - @emotion/styled 11.11.0
  - @mui/icons-material 5.17.1
- React Swipeable Views 0.14.0

### Map Integration
- Leaflet 1.9.4
- React Leaflet 4.2.1

### Development Dependencies
- @testing-library/jest-dom 5.17.0
- @testing-library/react 13.4.0
- @testing-library/user-event 13.5.0
- React Scripts 5.0.1
- Web Vitals 2.1.4

## Development

The frontend application is configured to communicate with the backend API running on `http://localhost:5000`. Make sure the backend server is running before testing the frontend features. 

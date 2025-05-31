# Backend

This is the backend application for the Diet Plan Generator, built with FastAPI. It provides an API for generating personalized diet plans using Google's Gemini AI.

## Features

- RESTful API for diet plan generation
- Integration with Google's Gemini AI
- CORS support for frontend integration
- Environment variable configuration
- Structured response format for meal plans

## Getting Started

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory and add your Google API key:
```
GOOGLE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
uvicorn main:app --reload
```

The API will be available at [http://localhost:5000](http://localhost:5000).
API documentation will be available at [http://localhost:5000/docs](http://localhost:5000/docs).

## API Endpoints

- `POST /generate`: Generates a personalized diet plan based on user requirements
  - Request body: `{"prompt": "your requirements here"}`
  - Returns structured meal plan with ingredients, calories, and costs

## Dependencies

- FastAPI (0.109.2) - Modern, fast web framework for building APIs
- Uvicorn (0.27.1) - ASGI server for running FastAPI applications
- Pydantic (2.6.1) - Data validation and settings management
- Python-dotenv (1.0.1) - Environment variable management
- Google Generative AI (0.3.2) - Google's Gemini AI API client

## Development

The application uses FastAPI's built-in CORS middleware to allow requests from the frontend application running on `http://localhost:3000`. Make sure to update the CORS settings if your frontend runs on a different port or domain.


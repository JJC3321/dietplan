# Backend

This is the backend application for the Market Plan, built with FastAPI. It provides an API for generating personalized diet plans using Google's Gemini AI.

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

## Dependencies

- FastAPI - Modern, fast web framework for building APIs
- Uvicorn - ASGI server for running FastAPI applications
- Pydantic - Data validation and settings management
- Python-dotenv - Environment variable management
- Google Genai - Google's Gemini AI API client


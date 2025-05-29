# Reboot Earth Backend

This is the backend application for the Reboot Earth project, built with FastAPI.

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

3. Start the development server:
```bash
uvicorn main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000).
API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Dependencies

- FastAPI - Modern, fast web framework
- Uvicorn - ASGI server
- SQLAlchemy - SQL toolkit and ORM
- Pydantic - Data validation
- Alembic - Database migrations
- Python-jose - JWT tokens
- Passlib - Password hashing
- Pytest - Testing framework 
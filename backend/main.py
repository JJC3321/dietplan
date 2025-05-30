from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Diet Plan Generator API",
    description="API for generating personalized diet plans using Google's Gemini AI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
client = genai.Client(api_key=os.getenv('GOOGLE_API_KEY'))
model = 'gemini-2.0-flash'

class PromptRequest(BaseModel):
    prompt: str

def create_structured_prompt(user_prompt: str) -> str:
    return f"""Generate a diet plan following this EXACT template format. Do not include any dates, disclaimers, or additional text.

Dish Name: [Name]
Ingredients:
- [Ingredient 1]
  - Calories: [number]
  - Nutrition: [key nutrients]
  - Cost: $[estimated cost]
- [Ingredient 2]
  - Calories: [number]
  - Nutrition: [key nutrients]
  - Cost: $[estimated cost]
Total Calories: [total]
Total Cost: $[total]

Dish Name: [Name]
Ingredients:
- [Ingredient 1]
  - Calories: [number]
  - Nutrition: [key nutrients]
  - Cost: $[estimated cost]
- [Ingredient 2]
  - Calories: [number]
  - Nutrition: [key nutrients]
  - Cost: $[estimated cost]
Total Calories: [total]
Total Cost: $[total]


Dish Name: [Name]
Ingredients:
- [Ingredient 1]
  - Calories: [number]
  - Nutrition: [key nutrients]
  - Cost: $[estimated cost]
- [Ingredient 2]
  - Calories: [number]
  - Nutrition: [key nutrients]
  - Cost: $[estimated cost]
Total Calories: [total]
Total Cost: $[total]

Requirements: {user_prompt}

IMPORTANT: Follow this exact format. Do not add any dates, times, or additional text. Only include the meal information as shown above."""

@app.post("/generate")
async def generate_diet_plan(request: PromptRequest):
    try:
        if not request.prompt:
            raise HTTPException(status_code=400, detail="No prompt provided")

        # Create structured prompt
        structured_prompt = create_structured_prompt(request.prompt)

        # Generate response from Gemini
        response = client.models.generate_content(
            model=model,
            contents=structured_prompt
        )
        
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)



import os 
import requests
from google import genai
from dotenv import load_dotenv
import json

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

with open("prompt.json", "r") as f:
    prompt = json.load(f)
    

diet_type = input("Enter the diet type: ")
prompt = prompt[diet_type]
    
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=prompt
)
print(response.text)



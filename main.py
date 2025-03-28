from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get environment variables with defaults
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PORT = int(os.getenv("PORT", "8000"))
HOST = os.getenv("HOST", "0.0.0.0")
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

print(f"ALLOWED_ORIGINS: {ALLOWED_ORIGINS}")

# Initialize OpenAI client
client = openai.OpenAI(api_key=OPENAI_API_KEY)

app = FastAPI(debug=DEBUG)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "Task Planner API", "version": "1.0.0"}


class TaskRequest(BaseModel):
    tasks: List[str]


class TaskResponse(BaseModel):
    schedule: List[dict]
    explanation: str


@app.post("/api/plan-tasks", response_model=TaskResponse)
async def plan_tasks(request: TaskRequest):
    try:
        # Create a prompt for the OpenAI API
        prompt = f"""Given these tasks for today: {', '.join(request.tasks)}
        Please create an optimal schedule for these tasks. Consider:
        1. Task dependencies
        2. Time of day appropriateness
        3. Energy levels
        4. School/work hour conflicts
        
        Format the response as a JSON with two fields:
        1. "schedule": A list of objects with "time" and "task" fields
        2. "explanation": A brief explanation of the reasoning behind the schedule
        
        Example format:
        {{
            "schedule": [
                {{"time": "9:00 AM", "task": "Task 1"}},
                {{"time": "11:00 AM", "task": "Task 2"}}
            ],
            "explanation": "Explanation here..."
        }}"""

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful task planning assistant.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=500,
        )

        # Parse the response
        import json

        try:
            result = json.loads(response.choices[0].message.content)
            return TaskResponse(
                schedule=result["schedule"], explanation=result["explanation"]
            )
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Failed to parse AI response")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=HOST, port=PORT)

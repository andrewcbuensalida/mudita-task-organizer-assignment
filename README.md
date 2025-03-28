The front-end is https://github.com/andrewcbuensalida/mudita-frontend.git

# Task Planner Application

A web application that helps users plan their daily tasks using AI. The application uses OpenAI's GPT model to create an optimal schedule based on task dependencies, time of day appropriateness, and other factors.

## Features

-   Responsive design that works on both web and mobile screens
-   Dynamic task input with add/remove functionality
-   AI-powered task scheduling
-   Beautiful Material-UI interface
-   Real-time loading states and error handling

## Prerequisites

-   Python 3.8 or higher
-   OpenAI API key

## Setup

### Backend Setup

1. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On Unix or MacOS
    source venv/bin/activate
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Create a `.env` file in the backend directory and add your OpenAI API key:

    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

5. Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```

The backend will be available at `http://localhost:8000`


## Technologies Used

-   Backend:

    -   FastAPI
    -   OpenAI API
    -   Python-dotenv
    -   Pydantic


## To deploy to render.com
- build command should be `pip install -r requirements.txt`
- run command should be `gunicorn main:app -w 1 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000`
- enter the environment variables ALLOWED_ORIGINS, OPENAI_API_KEY, PORT. ALLOWED_ORIGINS comes from after deploying frontend on vercel.
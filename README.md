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
-   Node.js 16 or higher
-   OpenAI API key

## Setup

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On Unix or MacOS
    source venv/bin/activate
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Create a `.env` file in the backend directory and add your OpenAI API key:

    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

5. Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

The frontend will be available at `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter your tasks for the day using the input fields
3. Click "Add Another Task" to add more tasks
4. Click "Plan My Day" to generate an optimized schedule
5. View your AI-generated schedule with explanations for the task ordering

## Technologies Used

-   Backend:

    -   FastAPI
    -   OpenAI API
    -   Python-dotenv
    -   Pydantic

-   Frontend:
    -   React
    -   TypeScript
    -   Material-UI
    -   Axios
    -   Vite

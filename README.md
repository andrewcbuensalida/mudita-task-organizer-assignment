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
    venv\Scripts\activate
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


## To deploy to elastic beanstalk
- Follow https://aws.plainenglish.io/building-a-weather-api-endpoint-with-fastapi-aws-elastic-bean-stalk-90579c71e6b
  - `pipx install awsebcli`
  - Remove pypiwin32==223 and pywin32==308 from requirements.txt
  - `eb init --platform python-3.12 --region us-west-1 task-organizer` <- This creates an application in eb
  - `eb create --region us-west-1 task-organizer-dev` <- This creates everything else like zip and upload to s3, security group, environment, autoscaling group, cloudwatch alarm, ec2, loadbalancer
  - Add environment variables in configuration in eb console or `eb setenv OPENAI_API_KEY=your_key_here`
  - `eb deploy` To update environment. IMPORTANT! It only zips latest commit, so commit before running this.
  - get the endpoint `eb status`
  - If it fails to deploy, allow all traffic in the security group of the ec2 instance, then connect to it, then check `cat /var/log/eb-engine.log`
  - `eb terminate` To terminate environment
  - `eb open` To open the url
  - `eb logs` To see logs in the ec2 instance
- Setup cloudwatch logs. It will be under log group /aws/elasticbeanstalk/comic-social-curator-dev/var/log/web.stdout.log
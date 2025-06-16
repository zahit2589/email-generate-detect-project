# Email Generator and Detection Project

This project is a web application that generates email texts using artificial intelligence and detects whether a text was written by AI or a human. The project consists of a React frontend and a Python FastAPI backend.

## Features

- **Email Generation:** Creates new emails based on a given subject and main points.
- **Email Reply:** Generates appropriate replies to an existing email.
- **Source Detection:** Analyzes a given text to determine if it was written by AI or a human.

## Technologies

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast and modern development and build tool.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **React Router:** For in-app routing.

### Backend

- **Python:** The main programming language.
- **FastAPI:** A modern, high-performance web framework for building APIs.
- **Transformers (Hugging Face):** For using Natural Language Processing (NLP) models.
  - `sagorsarker/emailgenerator`: For email text generation.
  - `Juner/AI-generated-text-detection`: For text source detection.
- **Pydantic:** For data validation and settings management.
- **Uvicorn:** As an ASGI server.

## Setup and Running

Follow the steps below to run the project on your local machine.

### 1. Setting up the Backend

The backend project is in the `email-generator-be` folder.

```bash
# 1. Go to the backend directory
cd email-generator-be

# 2. Create and activate a Python virtual environment
python -m venv .venv
# For Windows:
.venv\Scripts\activate
# For macOS/Linux:
# source .venv/bin/activate

# 3. Install the required libraries
pip install -r requirements.txt

# 4. Start the FastAPI server
uvicorn main:app --reload
```

The server will run at `http://127.0.0.1:8000` by default.

### 2. Setting up the Frontend

The frontend project is in the `email-generator` folder.

```bash
# 1. Go to the frontend directory
cd email-generator

# 2. Install the required NPM packages
npm install

# 3. Start the development server
npm run dev
```

The application will open at `http://localhost:5173` (or another port specified in the terminal) by default.

## API Endpoints

The backend provides the following API endpoints:

- **POST** `/generate-email`

  - Creates a new email.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "recipient": "string",
      "main_points": "string"
    }
    ```

- **POST** `/generate-reply`

  - Creates a reply to an email.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "recipient": "string",
      "original_email": "string",
      "reply_purpose": "string"
    }
    ```

- **POST** `/detect-text-source`
  - Detects the source of the text (AI or Human).
  - **Request Body:**
    ```json
    {
      "text": "string"
    }
    ```

## Contributing

To contribute, you can open a pull request in the project's repository.

# Task-manger# Task Manager

A full-stack task management application built with Node.js, Express, MongoDB, and React.

## Features

- User registration and authentication
- Create, update, and delete tasks
- View tasks specific to the logged-in user
- Responsive design

## Technologies Used

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Axios, Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

### Running the Application

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000`.

## Video Explanation

[![Task Manager Project Explanation]()](https://www.youtube.com/watch?v=O8LyCSK2bAM)

Click the image above to watch a video explanation of the project.

## License

This project is licensed under the MIT License.

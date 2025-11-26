# My-Old-Grimoire
This project is a full-stack web application built with a Node.js/Express backend and a JavaScript frontend.
It allows users to authenticate, create books, update them, delete them, and manage images.
The backend provides a secure REST API, and the frontend interacts with it using HTTP requests.

The app includes:

User authentication with JWT

Secure authorization checks on protected routes

Image upload handling with Multer

CRUD operations for books

A separated frontend and backend environment

Project Structure
project-root/

&emsp;frontend/     # Front-end application (HTML/CSS/JS or framework)
&emsp;&emsp;...
&emsp;backend/      # Back-end REST API (Node.js + Express)
&emsp;&emsp;server.js

How to Run the Project

You must launch the frontend and backend separately.

Run the Backend

Open a terminal

Navigate to the backend directory:

cd backend


Start the server using Nodemon:

nodemon server


This will start your Express server and automatically restart it when files change.

Run the Frontend

Open another terminal

Navigate to the frontend directory:

cd frontend


Start the frontend:

npm start


This launches the development server for the frontend.

How the App Works

The frontend sends HTTP requests to the backend API.

JWT tokens are used for login and restricted actions.

Book images are uploaded through Multer and saved in the /images folder.

Authorization ensures users can only modify or delete their own books.

Development Setup Requirements

Node.js + npm

Nodemon installed globally or locally

A .env file containing:

MongoDB connection string

JWT secret key

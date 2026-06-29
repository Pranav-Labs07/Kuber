# Kuber - Full Stack Ride Booking Application

## Overview

Kuber is a full-stack ride booking application inspired by Uber, built using **Node.js, Express.js, MongoDB, and React.js**. It provides secure user authentication, captain (driver) management, ride booking, fare estimation, and real-time ride management through a modern and responsive interface.

---

## Live Demo

**Frontend (Vercel)**
https://thekuber.vercel.app

**Backend API (Render)**
https://kuber.up.railway.app

**GitHub Repository**
https://github.com/Pranav-Labs07/Kuber

---

# Tech Stack

## Frontend

* React.js
* Vite
* CSS
* Axios
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Express Validator
* CORS
* Dotenv

---

# Features

## User

* User Registration
* User Login
* JWT Authentication
* View User Profile
* Book Rides
* Logout

## Captain (Driver)

* Captain Registration
* Login
* Vehicle Registration
* Accept Ride Requests
* Manage Ride Status

## Ride Management

* Fare Estimation
* Pickup and Destination Selection
* Ride Status Tracking
* Secure Booking Flow

---

# Project Structure

```
Kuber/
├── frontend/
├── backend/
├── README.md
└── package.json
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/Pranav-Labs07/Kuber.git

cd Kuber
```

---

# Backend Setup

Navigate to the backend folder.

```bash
cd backend

npm install
```

Create a `.env` file.

```env
PORT=4000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server.

```bash
npm run dev
```

or

```bash
node server.js
```

The backend will run on:

```
http://localhost:4000
```

---

# Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend

npm install
```

Create a `.env` file.

```env
VITE_BASE_URL=http://localhost:4000
```

Start the development server.

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

# Deployment

## Frontend

Platform: **Vercel**

Frontend URL:

```
https://thekuber.vercel.app
```

## Backend

Platform: **Render**

Backend API:

```
https://kuber.up.railway.app
```

Update the frontend environment variable before deployment.

```env
VITE_BASE_URL=https://kuber.up.railway.app
```

---

# Authentication

The application uses JWT-based authentication.

Protected routes require a valid JWT token.

Authentication is handled using:

* Authorization Header
* HTTP Cookies

---

# API Endpoints

## User Routes

### Register User

**POST**

```
/users/register
```

Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

---

### User Profile

**GET**

```
/users/profile
```

Authentication Required

---

### Logout

**GET**

```
/users/logout
```

Authentication Required

---

## Captain Routes

### Register Captain

**POST**

```
/captains/register
```

Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Driver"
  },
  "email": "driver@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## Ride Routes

### Get Ride Fare

**GET**

```
/rides/get-fare
```

Query Parameters

```
pickup
destination
```

---

# Application Flow

1. Validate user input.
2. Hash passwords using Bcrypt.
3. Store data in MongoDB.
4. Generate JWT tokens.
5. Return authenticated responses.
6. Manage ride requests and ride status.

---

# Security

* Password hashing using Bcrypt
* JWT Authentication
* Protected API Routes
* Token Blacklisting on Logout
* Input Validation using Express Validator

---

# Testing

Example request using Postman.

Method

```
POST
```

URL

```
http://localhost:4000/users/register
```

Headers

```
Content-Type: application/json
```

---

# Dependencies

### Backend

* express
* mongoose
* bcrypt
* jsonwebtoken
* express-validator
* cors
* dotenv

### Frontend

* react
* react-router-dom
* axios
* vite

---

# Database Models

## User

```javascript
{
  fullname,
  email,
  password,
  socketId
}
```

## Captain

```javascript
{
  fullname,
  email,
  password,
  vehicle,
  status
}
```

## Ride

```javascript
{
  user,
  captain,
  pickup,
  destination,
  fare,
  status
}
```

---

# Frontend to Backend Communication

Example API request.

```javascript
fetch("http://localhost:4000/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
```

---

# Environment Variables

## Backend

```env
PORT=4000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Frontend

Development

```env
VITE_BASE_URL=http://localhost:4000
```

Production

```env
VITE_BASE_URL=https://kuber.up.railway.app
```

---

# Notes

* Ensure MongoDB is running before starting the backend.
* Configure environment variables correctly.
* Start the backend before launching the frontend in development.
* Update the API base URL before deploying the frontend.

---

# Author

**Pranav Durge**

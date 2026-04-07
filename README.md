# 🚗 Kuber - An Uber Clone (Full Stack Application)

## 📌 Overview

Kuber is a full-stack Uber-like ride booking application built using **Node.js, Express, MongoDB, and modern frontend technologies**.

It supports user authentication, captain (driver) management, and ride fare estimation with a clean UI and secure backend.

---

## 🌐 Live Project

🔗 **Live App:** https://kuber.up.railway.app
🔗 **Frontend Repo:** https://github.com/Pranav-Labs07/Kuber

---

## ⚙️ Tech Stack

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt
* Express Validator

### 🔹 Frontend

* React.js (assumed based on structure)
* Axios / Fetch API
* Modern UI components

---

## 🚀 Features

### 👤 User

* Register & Login
* JWT Authentication
* View Profile
* Book Rides

### 🚕 Captain (Driver)

* Register with vehicle details
* Accept/Manage rides

### 🚘 Ride System

* Fare Estimation
* Pickup & Destination handling
* Ride status tracking

---

## 📂 Project Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

## 🔧 Backend Setup

### Install Dependencies

```bash
npm install
```

### Create `.env` file

```env
PORT=4000
DB_CONNECT=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
npx nodemon
```

or

```bash
node server.js
```

Backend runs on:
👉 `http://localhost:4000`

---

## 🌐 Frontend Setup

### Clone Frontend Repo

```bash
git clone https://github.com/Pranav-Labs07/Kuber
cd Kuber
npm install
npm run dev
```

### ⚠️ Important

Update frontend API base URL if needed:

```env
VITE_BASE_URL=http://localhost:4000
```

---

## 🔐 Authentication

* JWT-based authentication
* Token required for protected routes
* Sent via:

  * Authorization header
  * Cookies

---

## 📡 API Endpoints

---

### 👤 Users

#### 🔹 Register

**POST** `/users/register`

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

#### 🔹 Profile

**GET** `/users/profile`
🔐 Requires Auth

---

#### 🔹 Logout

**GET** `/users/logout`
🔐 Requires Auth

---

### 🚕 Captains

#### 🔹 Register

**POST** `/captains/register`

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Driver"
  },
  "email": "john@example.com",
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

### 🚘 Rides

#### 🔹 Get Fare

**GET** `/rides/get-fare`

Query:

* `pickup`
* `destination`

---

## 🔄 Data Flow

1. Validate input
2. Hash password (bcrypt)
3. Store in MongoDB
4. Generate JWT
5. Send response

---

## 🔒 Security

* Password hashing (bcrypt)
* JWT authentication
* Token blacklisting on logout

---

## 🧪 Testing (Postman)

* Method: POST
* URL: `http://localhost:4000/users/register`
* Header: `Content-Type: application/json`

---

## 📦 Dependencies

* express
* mongoose
* bcrypt
* jsonwebtoken
* express-validator
* cors
* dotenv

---

## 🗄️ Database Models

### User

```js
{
  fullname,
  email,
  password,
  socketId
}
```

### Captain

```js
{
  fullname,
  email,
  password,
  vehicle,
  status
}
```

### Ride

```js
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

## 🧠 How Frontend Connects to Backend

Example API call:

```js
fetch("http://localhost:4000/users/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
```

---

## ⚠️ Important Notes

* Ensure backend is running before frontend
* Update `.env` variables properly
* Use correct API base URL in production

---

## 👨‍💻 Author

**Pranav Durge**

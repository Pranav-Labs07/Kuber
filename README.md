# 🚗 Kuber Backend API

## 📌 Overview

Backend API for an Uber-like application built with **Node.js, Express, and MongoDB**.
Supports user authentication, captain (driver) management, and ride fare calculation.

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt
* Express Validator

---

## 📂 Project Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```env
PORT=4000
DB_CONNECT=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Server

```bash
npx nodemon
```

or

```bash
node server.js
```

Server runs on:
👉 `http://localhost:4000`

---

## 🔐 Authentication

* JWT-based authentication
* Token required for protected routes
* Can be sent via:

  * `Authorization: Bearer <token>`
  * Cookies

---

## 📡 API Endpoints

---

### 👤 Users

#### 🔹 Register User

**POST** `/users/register`

##### Request Body

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

##### Success Response (201)

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "id",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com"
  }
}
```

##### Errors

* Invalid email
* Password < 6 chars
* Email already exists

---

#### 🔹 Get Profile

**GET** `/users/profile`

🔐 Requires Auth

##### Response

```json
{
  "_id": "id",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com"
}
```

---

#### 🔹 Logout

**GET** `/users/logout`

🔐 Requires Auth

##### Response

```json
{
  "message": "Logged out"
}
```

---

### 🚕 Captains (Drivers)

#### 🔹 Register Captain

**POST** `/captains/register`

##### Request Body

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

##### Validation

* Vehicle type: `car | motorcycle | auto`
* Capacity ≥ 1
* All fields required

---

### 🚘 Rides

#### 🔹 Get Fare Estimate

**GET** `/rides/get-fare`

🔐 Requires Auth

##### Query Params

* `pickup`
* `destination`

##### Response

```json
{
  "auto": 50.75,
  "car": 120.50,
  "moto": 30.25,
  "distance": "10.5 km",
  "duration": "25 min"
}
```

---

## 🔄 Data Flow

1. Validate input
2. Hash password (bcrypt)
3. Store in MongoDB
4. Generate JWT
5. Send response

---

## 🔒 Security

* Passwords hashed using bcrypt (10 rounds)
* JWT authentication
* Tokens blacklisted on logout

---

## 🧪 Testing (Postman)

* Method: `POST`
* URL: `http://localhost:4000/users/register`
* Headers: `Content-Type: application/json`

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
  fullname: { firstname, lastname },
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

## 👨‍💻 Author

**Pranav Durge**

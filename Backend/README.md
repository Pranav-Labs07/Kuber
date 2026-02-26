# Uber Backend API Documentation
## Overview
This is the backend API for the Uber application built with Node.js, Express, and MongoDB.

---

## Endpoints

### POST /users/register

Register a new user account.

#### Description
Creates a new user with the provided credentials. The password is hashed before storing in the database. A JWT authentication token is generated and returned upon successful registration.

#### URL
```
POST http://localhost:4000/users/register
```

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
The request body must be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (required, min 3 characters)",
    "lastname": "string (optional, min 3 characters if provided)"
  },
  "email": "string (required, valid email format)",
  "password": "string (required, min 6 characters)"
}
```

#### Request Body Parameters

| Parameter | Type | Required | Validation | Description |
|-----------|------|----------|-----------|-------------|
| `fullname.firstname` | string | Yes | Min 3 characters | User's first name |
| `fullname.lastname` | string | No | Min 3 characters | User's last name |
| `email` | string | Yes | Valid email format, unique | User's email address |
| `password` | string | Yes | Min 6 characters | User's password (will be hashed) |

#### Example Request (POST - Correct Method)
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secure_password_123"
  }'
```

#### Example Request (GET - Invalid Method)
```bash
curl -X GET http://localhost:4000/users/register
```

**Response:**
```
Cannot GET /users/register
```
**Status Code:** `404 Not Found` - This endpoint only accepts POST requests

#### Success Response

**Status Code:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  },
  "receivedBody": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secure_password_123"
  }
}
```

#### Real-World Success Example (cURL Response)
```bash
$ curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Alice","lastname":"Smith"},"email":"alice@example.com","password":"password123"}'
```

**Response Output:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRhMWYyMzQzYjIxYzAwMDEyMzQ1NjciLCJpYXQiOjE2OTk1MzQ2NDN9.xKJ_mK9pL2qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL",
  "user": {
    "_id": "654a1f2343b21c000123456a",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com",
    "socketId": null
  },
  "receivedBody": {
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com",
    "password": "password123"
  }
}
```

#### Error Responses

##### Validation Error - 400 Bad Request

**Status Code:** `400 Bad Request`

Returned when one or more validation checks fail.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "ab",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

**Common Validation Errors:**
- Invalid email format: `"Invalid Email"`
- First name too short: `"First name must be at least 3 characters long"`
- Password too short: `"password must be 6 characters long"`

##### Example: Invalid Email Format
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John"},"email":"not-an-email","password":"password123"}'
```

**Response (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "not-an-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

##### Example: First Name Too Short
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jo"},"email":"john@example.com","password":"password123"}'
```

**Response (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

##### Example: Password Too Short
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"123"}'
```

**Response (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "password must be 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

##### Missing Required Fields - 400 Bad Request

**Status Code:** `400 Bad Request`

```json
{
  "errors": {
    "message": "All fields are required"
  }
}
```

##### Email Already Exists - 400 Bad Request

**Status Code:** `400 Bad Request`

Returned when the email is already registered in the system.

```json
{
  "errors": {
    "message": "Email already in use"
  }
}
```

##### Example: Duplicate Email Registration
```bash
# First registration - Success
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"password123"}'

# Second registration with same email - Fails
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Smith"},"email":"john@example.com","password":"password456"}'
```

**Second Response (400):**
```json
{
  "errors": {
    "message": "Email already in use"
  }
}
```

##### Server Error - 500 Internal Server Error

**Status Code:** `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

### GET /users/profile

Get authenticated user profile information.

#### Description
Retrieves the profile information of the currently authenticated user. Requires a valid JWT token in the Authorization header or as a cookie.

#### URL
```
GET http://localhost:4000/users/profile
```

#### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
```
or
```
Cookie: token=<JWT_TOKEN>
```

#### Success Response

**Status Code:** `200 OK`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": null,
  "__v": 0
}
```

#### Error Responses

##### Unauthorized - 401 Unauthorized

**Status Code:** `401 Unauthorized`

Returned when no valid token is provided or token is invalid/expired.

```json
{
  "message": "Unauthorized"
}
```

##### Example Request
```bash
# Using Authorization header
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### GET /users/logout

Logout the authenticated user and invalidate their token.

#### Description
Logs out the currently authenticated user by clearing the session cookie and blacklisting the JWT token. The user will no longer be able to use the invalidated token for authenticated requests.

#### URL
```
GET http://localhost:4000/users/logout
```

#### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
```
or
```
Cookie: token=<JWT_TOKEN>
```

#### Success Response

**Status Code:** `200 OK`

```json
{
  "message": "Logged out"
}
```

#### Error Responses

##### Unauthorized - 401 Unauthorized

**Status Code:** `401 Unauthorized`

Returned when no valid token is provided or token is invalid/expired.

```json
{
  "message": "Unauthorized"
}
```

#### What Happens on Logout

1. **Clear Cookie** - The `token` cookie is cleared from the client
2. **Blacklist Token** - The JWT token is added to the blacklist collection in MongoDB
3. **Future Requests Blocked** - Any future requests using the blacklisted token will be rejected
4. **Session Ended** - User is logged out and must login again to access protected routes

#### Example Request
```bash
# Using Authorization header
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### POST /captains/register

Register a new captain (driver) account.

#### Description
Creates a new captain with vehicle information. The password is hashed before storing in the database. A JWT authentication token is generated and returned upon successful registration.

#### URL
```
POST http://localhost:4000/captains/register
```

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
The request body must be a JSON object. The example below includes inline comments (using `//`) that describe validation rules and constraints enforced by the API.

> Note: the comments shown are for documentation only and are not valid in strict JSON parsers — they illustrate required fields and constraints to help crafting requests in Postman or your client.

```jsonc
{
  "fullname": {
    "firstname": "John",        // required, string, min length: 3
    "lastname": "Driver"        // optional, string, min length: 3 if provided
  },
  "email": "john.driver@example.com", // required, valid email format, unique
  "password": "secure_password_123",  // required, string, min length: 6
  "vehicle": {
    "color": "Black",           // required, string, min length: 3
    "plate": "ABC123",          // required, string, min length: 3
    "capacity": 4,                // required, number, min: 1
    "vehicleType": "car"        // required, one of: 'car', 'motorcycle', 'auto'
  }
}
```

#### Request Body Parameters

| Parameter | Type | Required | Validation | Description |
|-----------|------|----------|-----------|-------------|
| `fullname.firstname` | string | Yes | Min 3 characters | Captain's first name |
| `fullname.lastname` | string | No | Min 3 characters | Captain's last name |
| `email` | string | Yes | Valid email format, unique | Captain's email address |
| `password` | string | Yes | Min 6 characters | Captain's password (will be hashed) |
| `vehicle.color` | string | Yes | Min 3 characters | Vehicle color |
| `vehicle.plate` | string | Yes | Min 3 characters | Vehicle license plate |
| `vehicle.capacity` | number | Yes | Min 1 | Number of passenger seats |
| `vehicle.vehicleType` | string | Yes | 'car', 'motorcycle', 'auto' | Type of vehicle |

#### Example Request
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "password": "secure_password_123",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

#### Success Response

**Status Code:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

#### Error Responses

##### Validation Error - 400 Bad Request

**Status Code:** `400 Bad Request`

Returned when one or more validation checks fail.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "truck",
      "msg": "Invalid vehicle type",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

**Common Validation Errors:**
- Invalid email format: `"Invalid Email"`
- First name too short: `"First name must be at least 3 characters"`
- Password too short: `"Password must be at least 6 characters"`
- Color too short: `"Color must be at least 3 characters"`
- Plate too short: `"Plate must be at least 3 characters"`
- Invalid capacity: `"Capacity must be at least 1 sit of passenger"`
- Invalid vehicle type: `"Invalid vehicle type"` (must be 'car', 'motorcycle', or 'auto')

##### Example: Invalid Vehicle Type
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "John", "lastname": "Driver"},
    "email": "john@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "truck"
    }
  }'
```

**Response (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "truck",
      "msg": "Invalid vehicle type",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

##### Example: Capacity Not Valid
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "John", "lastname": "Driver"},
    "email": "john@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 0,
      "vehicleType": "car"
    }
  }'
```

**Response (400):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "0",
      "msg": "Capacity must be at least 1 sit of passenger",
      "path": "vehicle.capacity",
      "location": "body"
    }
  ]
}
```

##### Email Already Exists - 400 Bad Request

**Status Code:** `400 Bad Request`

Returned when the email is already registered in the system.

```json
{
  "errors": {
    "message": "Email already in use"
  }
}
```

##### Server Error - 500 Internal Server Error

**Status Code:** `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

## Data Flow

### Registration Process

1. **Validation** - Express-validator checks all input fields against defined rules
2. **Password Hashing** - Plain-text password is hashed using bcrypt (10 salt rounds)
3. **User Creation** - User document is created in MongoDB with hashed password
4. **Token Generation** - JWT token is signed using `JWT_SECRET` from environment variables
5. **Response** - Return user data and token to client

### Password Security

- Passwords are **never stored in plain text**
- Bcrypt with 10 salt rounds is used for hashing
- Hashed passwords are stored in the database with `select:false` option (excluded from queries by default)

---

## Postman Setup

### Step-by-step Guide

1. **Open Postman**
2. **Create a new request:**
   - Method: `POST`
   - URL: `http://localhost:4000/users/register`

3. **Set Headers:**
   - Click the `Headers` tab
   - Add: `Content-Type: application/json`

4. **Set Request Body:**
   - Click the `Body` tab
   - Select `raw`
   - Select `JSON` from the dropdown
   - Paste the following:
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

5. **Send Request** - Click the `Send` button
6. **Check Response** - View the response in the bottom panel

---

## Environment Variables

Required `.env` file in the Backend folder:

```
PORT=4000
DB_CONNECT=mongodb://your-mongodb-uri
JWT_SECRET=your-secret-key-here
```

---

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ORM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT token generation
- `express-validator` - Input validation
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management

---

## Running the Server

```bash
# Install dependencies
npm install

# Start server with nodemon (auto-reload on changes)
npx nodemon

# Or start directly
node server.js
```

Server will run on `http://localhost:4000` (or the port specified in `.env`)

---

## Database Schema

### User Model

```javascript
{
  fullname: {
    firstname: String (required, min 3 chars),
    lastname: String (min 3 chars)
  },
  email: String (required, unique, min 5 chars),
  password: String (required, not included by default),
  socketId: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Captain Model

```javascript
{
  fullname: {
    firstname: String (required, min 3 chars),
    lastname: String (min 3 chars)
  },
  email: String (required, unique, min 5 chars),
  password: String (required, not included by default),
  vehicle: {
    color: String (required, min 3 chars),
    plate: String (required, min 3 chars),
    capacity: Number (required, min 1),
    vehicleType: String (required, enum: ['car', 'motorcycle', 'auto'])
  },
  status: String (enum: ['active', 'inactive'], default: 'inactive'),
  socketId: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Ride Model

```javascript
{
  user: ObjectId (reference to User, required),
  captain: ObjectId (reference to Captain, optional),
  pickup: String (required),
  destination: String (required),
  fare: Number,
  status: String (enum: ['pending', 'accepted', 'started', 'completed', 'cancelled']),
  duration: String,
  distance: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Blacklisted Token Model

```javascript
{
  token: String (required, unique),
  createdAt: Date (auto, with TTL index for auto-deletion)
}
```
### GET /rides/get-fare

#### Description
Calculates the estimated fare for a ride based on the pickup and destination addresses.

#### URL
```
GET http://localhost:4000/rides/get-fare
```

#### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
```

#### Query Parameters
| Parameter     | Type   | Required | Description                          |
|---------------|--------|----------|--------------------------------------|
| `pickup`      | string | Yes      | The pickup address (min length: 3). |
| `destination` | string | Yes      | The destination address (min length: 3). |

#### Success Response

**Status Code:** `200 OK`

```json
{
  "auto": 50.75,
  "car": 120.50,
  "moto": 30.25,
  "distance": "10.5 km",
  "duration": "25 min"
}
```

#### Error Responses

##### Validation Error - 400 Bad Request

**Status Code:** `400 Bad Request`

```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Invalid pickup address",
      "path": "pickup",
      "location": "query"
    },
    {
      "type": "field",
      "value": "",
      "msg": "Invalid destination address",
      "path": "destination",
      "location": "query"
    }
  ]
}
```

##### Unauthorized - 401 Unauthorized

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

##### Internal Server Error - 500 Internal Server Error

**Status Code:** `500 Internal Server Error`

```json
{
  "message": "An error occurred while calculating the fare"
}
```

---

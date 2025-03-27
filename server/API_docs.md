# API Documentation

## Base URL

`http://<your-server-url>/`

---

## General Routes

### `GET /`

- **Description**: Check if the server is running.
- **Response**:
  - `200 OK`: `{ "message": "server is running, read the API docs for further references" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

---

## Authentication Routes

### `POST /auth/register`

- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `201 Created`: `{ "id": number, "fullName": "string", "email": "string" }`
  - `400 Bad Request`: `{ "message": "Validation error message" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `POST /auth/login`

- **Description**: Login with email and password.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `200 OK`: `{ "access_token": "string" }`
  - `400 Bad Request`: `{ "message": "Email is required" }` or `{ "message": "Password is required" }`
  - `401 Unauthorized`: `{ "message": "Invalid email/password" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `POST /auth/googlelogin`

- **Description**: Login using Google OAuth.
- **Request Body**:
  ```json
  {
    "googleToken": "string"
  }
  ```
- **Response**:
  - `200 OK`: `{ "access_token": "string" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

---

## User Routes (Authenticated)

### `GET /users/all`

- **Description**: Get all users.
- **Response**:
  - `200 OK`: `[{ "id": number, "fullName": "string", "email": "string" }]`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `GET /users/:id`

- **Description**: Get user by ID.
- **Response**:
  - `200 OK`: `{ "id": number, "fullName": "string", "email": "string" }`
  - `404 Not Found`: `{ "message": "User not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `PUT /users/:id/update`

- **Description**: Update user details.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `201 Created`: `{ "message": "User updated" }`
  - `400 Bad Request`: `{ "message": "Validation error message" }`
  - `404 Not Found`: `{ "message": "User not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `DELETE /users/:id/delete`

- **Description**: Delete a user.
- **Response**:
  - `200 OK`: `{ "message": "User deleted successfully", "id": number }`
  - `401 Unauthorized`: `{ "message": "Token is required" }`
  - `403 Forbidden`: `{ "message": "You are not allowed to delete yourself" }`
  - `404 Not Found`: `{ "message": "User not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

---

## Station Routes

### `GET /stations`

- **Description**: Get all stations.
- **Response**:
  - `200 OK`: `[{ "stationName": "string", "stationCode": "string", ... }]`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `GET /stations/:stationCode`

- **Description**: Get station by code.
- **Response**:
  - `200 OK`: `{ "stationName": "string", "stationCode": "string", ... }`
  - `404 Not Found`: `{ "message": "Station not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `POST /stations`

- **Description**: Create a new station.
- **Request Body**:
  ```json
  {
    "stationName": "string",
    "stationCode": "string",
    "stationOperationalArea": "string",
    "stationRegion": "string",
    "stationClass": number
  }
  ```
- **Response**:
  - `201 Created`: `{ "stationName": "string", "stationCode": "string", ... }`
  - `400 Bad Request`: `{ "message": "Validation error message" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `PUT /stations/:stationCode`

- **Description**: Update station details.
- **Request Body**:
  ```json
  {
    "stationName": "string",
    "stationCode": "string",
    "stationOperationalArea": "string",
    "stationRegion": "string",
    "stationClass": number
  }
  ```
- **Response**:
  - `200 OK`: `{ "message": "Station updated successfully" }`
  - `404 Not Found`: `{ "message": "Station not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `DELETE /stations/:stationCode`

- **Description**: Delete a station.
- **Response**:
  - `200 OK`: `{ "message": "Station deleted successfully" }`
  - `404 Not Found`: `{ "message": "Station not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

---

## Train Routes

### `GET /trains`

- **Description**: Get all trains.
- **Response**:
  - `200 OK`: `[{ "trainNumber": "string", "trainName": "string", ... }]`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `GET /trains/:trainNumber`

- **Description**: Get train by number.
- **Response**:
  - `200 OK`: `{ "trainNumber": "string", "trainName": "string", ... }`
  - `404 Not Found`: `{ "message": "Train not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `POST /trains`

- **Description**: Create a new train.
- **Request Body**:
  ```json
  {
    "trainNumber": "string",
    "trainName": "string",
    "from": "string",
    "to": "string"
  }
  ```
- **Response**:
  - `201 Created`: `{ "trainNumber": "string", "trainName": "string", ... }`
  - `400 Bad Request`: `{ "message": "Validation error message" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `PUT /trains/:trainNumber`

- **Description**: Update train details.
- **Request Body**:
  ```json
  {
    "trainNumber": "string",
    "trainName": "string",
    "from": "string",
    "to": "string"
  }
  ```
- **Response**:
  - `200 OK`: `{ "message": "Train updated successfully" }`
  - `404 Not Found`: `{ "message": "Train not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `DELETE /trains/:trainNumber`

- **Description**: Delete a train.
- **Response**:
  - `200 OK`: `{ "message": "Train deleted successfully" }`
  - `404 Not Found`: `{ "message": "Train not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

---

## Schedule Routes

### `GET /schedules`

- **Description**: Get all train schedules.
- **Response**:
  - `200 OK`: `[{ "arrival": "string", "departure": "string", ... }]`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `GET /schedules/:id`

- **Description**: Get schedule by ID.
- **Response**:
  - `200 OK`: `{ "arrival": "string", "departure": "string", ... }`
  - `404 Not Found`: `{ "message": "Schedule not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `POST /schedules`

- **Description**: Create a new schedule.
- **Request Body**:
  ```json
  {
    "arrival": "string",
    "departure": "string",
    "isPassingOnly": boolean,
    "isTerminus": boolean,
    "stationId": number,
    "trainId": number
  }
  ```
- **Response**:
  - `201 Created`: `{ "schedule": { ... }, "station": { ... }, "train": { ... } }`
  - `400 Bad Request`: `{ "message": "Missing required fields" }`
  - `404 Not Found`: `{ "message": "Train not found" }` or `{ "message": "Station not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `PUT /schedules/:id`

- **Description**: Update schedule details.
- **Request Body**:
  ```json
  {
    "arrival": "string",
    "departure": "string",
    "isPassingOnly": boolean,
    "isTerminus": boolean,
    "stationId": number,
    "trainId": number
  }
  ```
- **Response**:
  - `200 OK`: `{ "message": "Schedule updated successfully" }`
  - `404 Not Found`: `{ "message": "Schedule not found" }` or `{ "message": "Train not found" }` or `{ "message": "Station not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `DELETE /schedules/:id`

- **Description**: Delete a schedule.
- **Response**:
  - `200 OK`: `{ "message": "Schedule deleted successfully" }`
  - `404 Not Found`: `{ "message": "Schedule not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `GET /schedules/train/:trainNumber`

- **Description**: Get schedules by train number.
- **Response**:
  - `200 OK`: `[{ "arrival": "string", "departure": "string", ... }]`
  - `404 Not Found`: `{ "message": "Train not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `GET /schedules/station/:stationCode`

- **Description**: Get schedules by station code.
- **Response**:
  - `200 OK`: `[{ "arrival": "string", "departure": "string", ... }]`
  - `404 Not Found`: `{ "message": "Station not found" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

---

## Utility Routes

### `POST /utils/ai`

- **Description**: Get AI-generated response.
- **Request Body**:
  ```json
  {
    "message": "string"
  }
  ```
- **Response**:
  - `200 OK`: `{ "response": "string" }`
  - `400 Bad Request`: `{ "message": "Message is required" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

### `GET /utils/weather/:region`

- **Description**: Get weather information for a region.
- **Response**:
  - `200 OK`: `{ "weather": "string" }`
  - `500 Internal Server Error`: `{ "message": "Internal server error" }`

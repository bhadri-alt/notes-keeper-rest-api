## 🌐 Live Demo

- **Frontend:** https://bhadri-alt.github.io/notes-keeper-rest-api/
- **Backend:** https://notes-keeper-rest-api.onrender.com

# Notes Keeper

A full-stack Notes Keeper application built using Node.js, Express.js, MongoDB Atlas, and JavaScript. The application allows users to create, view, update, and delete notes using RESTful APIs.

## Features

- Create Notes
- View Notes
- Update Notes
- Delete Notes
- Responsive Frontend
- MongoDB Atlas Database
- RESTful API
- Thunder Client API Testing

## Tech Stack

Frontend
- HTML
- CSS
- JavaScript

Backend
- Node.js
- Express.js

Database
- MongoDB Atlas
- Mongoose

Tools
- Thunder Client
- Git
- GitHub

## API Endpoints

POST   /api/notes
![alt text](image-2.png)
GET    /api/notes
![alt text](image-1.png)
GET    /api/notes/:id
![alt text](image-3.png)
PUT    /api/notes/:id
![alt text](image-4.png)
DELETE /api/notes/:id
![alt text](image-5.png)

## Installation

npm install
npm run dev

# 🔒 API Rate Limiting

---

## 📦 Installation

Install the required middleware:

```bash
npm install express-rate-limit
```

---

## ⚙️ Implementation

### 1️⃣ Create Middleware File

Create a file named `middleware/rateLimiter.js`:

```javascript
const rateLimit = require("express-rate-limit");

// Configure rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ⏱️ 15 minutes
  max: 100, // 🚫 Limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  },
  standardHeaders: true, // ✅ Return rate limit info in headers
  legacyHeaders: false,  // ❌ Disable deprecated headers
});

module.exports = apiLimiter;
```

---

### 2️⃣ Apply Middleware

In your `server.js` or `app.js`:

```javascript
const apiLimiter = require("./middleware/rateLimiter");

// Apply rate limiting to all API routes
app.use("/api", apiLimiter);
```

---

## 📊 Rate Limit Configuration

| 🔧 Setting      | 📌 Value              |
| --------------- | --------------------- |
| ⏱️ Time Window  | 15 Minutes            |
| 🚫 Max Requests | 100 Requests          |
| ⚠️ Status Code  | 429 Too Many Requests |
| 📦 Middleware   | express-rate-limit    |

---

## 🚨 Response on Limit Exceeded

When a client exceeds the allowed request limit, the API returns:

```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

---

## ✅ Summary

* Protects API from abuse and excessive traffic
* Ensures fair usage across clients
* Improves overall application security and stability

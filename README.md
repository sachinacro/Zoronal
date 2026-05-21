# Review & Rate — MERN Stack Application

Frontend URL: https://zoronal-jzue.onrender.com/
Backend URL: https://zoronal-backend.onrender.com/

A full-stack MERN application where users can:

* Add companies
* Search/filter companies
* View company details
* Add reviews & ratings
* Sort reviews
* Like reviews
* Upload company logos using Cloudinary

---

# 🚀 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* Cloudinary

---

# 📁 Project Structure

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
│
└── .env


frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
```

---

# ⚙️ Backend Setup

## 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

---

## 2️⃣ Create `.env`

```env
PORT=5000

MONGODB_URI=xxxxxx
CLOUDINARY_CLOUD_NAME=xxxxxx
CLOUDINARY_API_KEY=xxxxxx
CLOUDINARY_API_SECRET=xxxxxx
```

---

## 3️⃣ Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# ⚙️ Frontend Setup

## 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

---

## 2️⃣ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# ✨ Features

## Company Features

* Add company
* Upload company logo
* Search companies
* Filter by city
* Sort companies
* Dynamic company listing

## Review Features

* Add review
* Rating system
* Review listing
* Like reviews
* Sort reviews

## UI Features

* Responsive design
* Figma-based UI
* Tailwind CSS styling
* Dynamic filters
* Search suggestions

---

# 📌 API Endpoints

---

## Company APIs

### Create Company

```http
POST /api/companies
```

### Get All Companies

```http
GET /api/companies
```

### Search Companies

```http
GET /api/companies?search=code
```

### Filter Companies

```http
GET /api/companies?city=Indore
```

### Sort Companies

```http
GET /api/companies?sort=rating
```

### Get Single Company

```http
GET /api/companies/:id
```

---

## Review APIs

### Add Review

```http
POST /api/reviews/:companyId
```

### Get Reviews

```http
GET /api/reviews/:companyId
```

### Like Review

```http
PATCH /api/reviews/like/:reviewId
```

---

# 📸 Cloudinary Upload

Company logos are uploaded using:

* Multer
* Cloudinary

Images are stored securely and URLs are saved in MongoDB.

---

# 🧠 Functionalities Implemented

✅ Add Company
✅ Upload Logo
✅ Company Listing
✅ Company Search
✅ Search Suggestions
✅ Filter by City
✅ Sort Companies
✅ Add Review
✅ Review Listing
✅ Like Review
✅ Average Rating Calculation
✅ Responsive UI
✅ Figma UI Matching

---

# 🛠 Future Improvements

* Authentication
* Pagination
* Edit/Delete Company
* Edit/Delete Review
* Toast Notifications
* Redux/Zustand State Management
* Unit Testing

---

# 👨‍💻 Author

Developed using MERN Stack.

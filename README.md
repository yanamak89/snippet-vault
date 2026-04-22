# 🧠 Snippet Vault

Mini fullstack application for storing and managing snippets (links, notes, commands) with search, tag filtering and pagination. Built as a practical CRUD system with real-world architecture and deployment.

---

## 🌍 Live Demo

Frontend:  
https://snippet-vault-silk.vercel.app  

Backend:  
https://snippet-vault-api-l9b6.onrender.com  

---

## ⚠️ Notes

- Backend runs on Render (free tier - may sleep after inactivity)
- First request may take up to 30–60 seconds

---

## 🚀 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS + DaisyUI

### Backend
- NestJS
- TypeScript
- MongoDB
- Mongoose

---

## 📦 Features

- Full CRUD (create, read, update, delete)
- Search by title/content (`q`)
- Filter by tag (`tag`)
- Pagination (`page`, `limit`)
- Snippet details page
- Edit & delete functionality
- Form validation
- Loading / empty / error UI states

---

## 📁 Project Structure

```text
snippet-vault/
├── backend/
└── frontend/
```

---

## ⚙️ Environment Variables

Create environment files based on the examples below.


## 📄 .env.example

### Backend
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/snippet-vault
FRONTEND_URL=http://localhost:3000
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> For production, MongoDB Atlas is used.

---

## ▶️ Run Locally

### 1. Start MongoDB
```bash
brew services start mongodb-community@7.0
```

### 2. Start Backend
```bash
cd backend
npm install
npm run start:dev
```
Backend: http://localhost:3001  

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:3000  

---

## 🔌 API Endpoints

- `POST /snippets`
- `GET /snippets?page=1&limit=10&q=search&tag=tag`
- `GET /snippets/:id`
- `PATCH /snippets/:id`
- `DELETE /snippets/:id`

---

## 📬 API Testing

You can test the API using Postman or curl.

### 🔹 Option 1: Postman

1. Open Postman  
2. Click Import  
3. Select snippet-vault.postman_collection.json  
4. Use base URL: http://localhost:3001  

### 🔹 Option 2: curl

Create snippet:
```bash
curl -X POST http://localhost:3001/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Docker command",
    "content": "docker compose up --build",
    "tags": ["docker", "devops"],
    "type": "command"
  }'
```

Get all snippets:
```bash
curl "http://localhost:3001/snippets?page=1&limit=10"
```

Get snippet by ID:
```bash
curl http://localhost:3001/snippets/:id
```

---

## 🏗 Build & Run in Production

### Backend
```bash
npm run build
npm run start:prod
```

### Frontend
```bash
npm run build
npm run start
```

---

## 🔧 Improvements & Next Steps

All core requirements were implemented within the given time.  
Given more time, I would focus on:

- improving UX feedback (toasts, better error handling)
- adding debounced search
- implementing sorting (by date/type)
- writing unit and e2e tests
- improving accessibility
- adding Docker support

---

## 👤 Author

Yana Makogon

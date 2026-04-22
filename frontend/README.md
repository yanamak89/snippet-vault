# 🧠 Snippet Vault

Mini fullstack application for storing useful snippets (links, notes,
commands) with search, tags, and pagination.

------------------------------------------------------------------------

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

------------------------------------------------------------------------

## 📦 Features

- Full CRUD (create, read, update, delete)
- Search by title/content (`q`)
- Filter by tag (`tag`)
- Pagination (`page`, `limit`)
- Snippet details page
- Edit & delete functionality
- Form validation
- Loading / empty / error UI states

------------------------------------------------------------------------

## 📁 Project Structure

snippet-vault/  
├── backend/  
└── frontend/

------------------------------------------------------------------------

## ⚙️ Environment Variables

### backend/.env

PORT=3001  
MONGODB_URI=mongodb://localhost:27017/snippet-vault  
FRONTEND_URL=http://localhost:3000  

### frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:3001  

------------------------------------------------------------------------

## 📄 .env.example

### backend/.env.example

PORT=3001  
MONGODB_URI=mongodb://localhost:27017/snippet-vault  
FRONTEND_URL=http://localhost:3000  

### frontend/.env.example

NEXT_PUBLIC_API_URL=http://localhost:3001  

------------------------------------------------------------------------

## ▶️ Run Locally

### 1. Start MongoDB

brew services start mongodb-community@7.0  

### 2. Start Backend

cd backend  
npm install  
npm run start:dev  

Backend: http://localhost:3001  

### 3. Start Frontend

cd frontend  
npm install  
npm run dev  

Frontend: http://localhost:3000  

------------------------------------------------------------------------

## 🔌 API Endpoints

POST /snippets  
GET /snippets?page=1&limit=10&q=search&tag=tag  
GET /snippets/:id  
PATCH /snippets/:id  
DELETE /snippets/:id  

------------------------------------------------------------------------

## 📬 API Testing

You can test the API using Postman or curl.

### 🔹 Option 1: Postman

Import the Postman collection:

1. Open Postman  
2. Click Import  
3. Select snippet-vault.postman_collection.json  
4. Use base URL:

http://localhost:3001

Notes:
- Replace :id with a real snippet ID  
- Make sure the backend is running  

### 🔹 Option 2: curl

Create snippet:

curl -X POST http://localhost:3001/snippets \
  -H "Content-Type: application/json" \
  -d '{  
    "title": "Docker command",  
    "content": "docker compose up --build",  
    "tags": ["docker", "devops"],  
    "type": "command"  
  }'

Get all snippets:

curl "http://localhost:3001/snippets?page=1&limit=10"

Search snippets:

curl "http://localhost:3001/snippets?q=docker"

Filter by tag:

curl "http://localhost:3001/snippets?tag=docker"

Get snippet by ID:

curl http://localhost:3001/snippets/:id

Update snippet:

curl -X PATCH http://localhost:3001/snippets/:id \
  -H "Content-Type: application/json" \
  -d '{  
    "title": "Updated title",  
    "content": "Updated content",  
    "tags": ["updated"],  
    "type": "note"  
  }'

Delete snippet:

curl -X DELETE http://localhost:3001/snippets/:id

------------------------------------------------------------------------

## 📦 Verify MongoDB Data (via mongosh)

mongosh  
use snippet-vault  
show collections  
db.snippets.find().pretty()  

------------------------------------------------------------------------

## 🏗 Build & Run in Production

### Backend

npm run build  
npm run start:prod  

### Frontend

npm run build  
npm run start  

------------------------------------------------------------------------

## 🧪 What is covered

- CRUD API  
- DTO validation  
- Error handling (400 / 404)  
- Pagination  
- Search + filtering  
- MongoDB integration  
- Clean architecture (NestJS)  
- Clean UI (Next.js)  

------------------------------------------------------------------------

## ❌ Not implemented (by design)

- Authentication  
- File uploads  
- Complex architecture  
- External services  

------------------------------------------------------------------------

## ⚠️ What I didn't finish

All core requirements are implemented.  
Further improvements are listed below.  

------------------------------------------------------------------------

## 🔧 What I would improve next

- Debounced search  
- Better notifications (toasts)  
- Sorting (by date/type)  
- Accessibility improvements  
- Unit / e2e tests  
- Docker setup  

------------------------------------------------------------------------

## 👤 Author

Yana Makogon

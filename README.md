# ✍️ MediumV2 — Modern Blogging Platform

A full-stack **blogging platform inspired by Medium**, built with a modern tech stack focused on performance, scalability, and developer experience.

---

## 🚀 Overview

**MediumV2** is a feature-rich blogging website where users can:

* 📝 Create and publish blogs
* ✏️ Edit and manage posts
* 🔐 Authenticate securely
* 📖 Read blogs from other users

Built using **edge-first architecture** with Cloudflare Workers for blazing fast performance.

---

## 🧠 Tech Stack

### 🌐 Frontend

* ⚛️ React (TypeScript)
* 🎨 Tailwind CSS (optional if you're using)
* 🔄 Fetch API / Axios

### ⚙️ Backend

* ⚡ Hono (Cloudflare Workers)
* 🔐 JWT Authentication
* 🧪 Zod (Schema validation)

### 🗄️ Database & ORM

* 🐘 PostgreSQL
* 🧬 Prisma ORM

---

## 🏗️ Architecture

```text
Frontend (React)
        ↓
API (Hono - Cloudflare Workers)
        ↓
Prisma ORM
        ↓
PostgreSQL Database
```

---

## 📁 Project Structure

```text
mediumV2/
│
├── frontend/          # React App
│
├── backend/           # Hono (Cloudflare Workers)
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── index.ts
│
├── prisma/
│   └── schema.prisma
│
├── lib/
│   └── prisma.ts
│
├── .env
└── README.md
```

---

## 🔐 Features

* ✅ User Authentication (JWT-based)
* ✅ Create / Read / Update / Delete Blogs
* ✅ Input validation using Zod
* ✅ Type-safe database queries with Prisma
* ✅ Edge deployment with Cloudflare Workers
* ✅ Scalable PostgreSQL database

---

## ⚙️ Setup Instructions

---

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/mediumV2.git
cd mediumV2
```

---

### 🔹 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 🔹 3. Setup Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mediumv2"
JWT_SECRET="your_secret_key"
```

---

### 🔹 4. Setup Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### 🔹 5. Run the Project

#### Start Backend (Hono)

```bash
npm run dev
```

#### Start Frontend

```bash
npm run dev
```

---

## 🐳 Docker Setup (Optional)

### Run PostgreSQL in Docker

```bash
docker run --name medium-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mediumv2 -p 5432:5432 -d postgres
```

---

## 🔑 API Endpoints (Sample)

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| POST   | `/signup`    | Register user |
| POST   | `/signin`    | Login user    |
| GET    | `/blogs`     | Get all blogs |
| POST   | `/blogs`     | Create blog   |
| PUT    | `/blogs/:id` | Update blog   |
| DELETE | `/blogs/:id` | Delete blog   |

---

## 🧪 Validation Example (Zod)

```ts
import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
});
```

---

## 🔐 JWT Flow

1. User logs in
2. Server returns JWT
3. Client stores token
4. Token sent in headers for protected routes

---

## 🚀 Deployment

### Backend

* Cloudflare Workers (via Hono)

### Frontend

* Vercel / Netlify

### Database

* Neon / Supabase / Railway PostgreSQL

---

## 🎯 Future Improvements

* ❤️ Like & comment system
* 🔎 Search & filtering
* 🧑‍💻 User profiles
* 📊 Analytics dashboard
* 🌙 Dark mode

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork and improve the project.

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

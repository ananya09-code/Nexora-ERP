# Nexora ERP

A modern full-stack ERP application designed to help businesses manage products, inventory, and day-to-day operations through a centralized platform.

**[🌐 Live Demo](https://nexora-erp-zgd7.vercel.app/)**

## 🚀 Features

* 🔐 User authentication and protected routes
* 📊 Business dashboard
* 📦 Inventory management
* 🏷️ Product management
* ✏️ Create and update products
* 🔄 Manage product status
* 📱 Responsive and modern UI
* 🗄️ PostgreSQL database integration

## 🛠️ Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

**Backend & Database**

* Next.js
* Prisma ORM
* PostgreSQL
* Better Auth

**Tools & Deployment**

* Git & GitHub
* Vercel
* Neon PostgreSQL

## 🏗️ Architecture

Nexora uses a full-stack Next.js architecture that connects the user interface, server-side logic, authentication, and database.

```text
Next.js / React
      ↓
Server-side Logic
      ↓
Prisma ORM
      ↓
PostgreSQL
```

## ⚙️ Getting Started

### Clone the repository

```bash
git clone https://github.com/ananya09-code/nexora-erp.git
cd nexora-erp
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
BETTER_AUTH_SECRET="your_secret"
BETTER_AUTH_URL="http://localhost:3000"
```

### Set up the database

```bash
npx prisma generate
npx prisma db push
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## 🚀 Deployment

The application is deployed on **Vercel** with **Neon PostgreSQL** as the production database.

**Live:** https://nexora-erp-zgd7.vercel.app/

## 📌 Project Status

**Completed and deployed.**

Nexora was built to gain practical experience with full-stack development, database design, authentication, responsive UI development, and production deployment.

## 👨‍💻 Author

**Ananya Mengistu**

Frontend-focused full-stack developer.

**GitHub:** https://github.com/ananya09-code
**LinkedIn:** https://linkedin.com/in/ananya-mangistu-445191348

# 🎓 EduNest – MERN Stack Education Platform

EduNest is a modern online learning platform designed to connect students, teachers, and admins in a single ecosystem. Built using the MERN Stack (MongoDB, Express.js, React.js, Node.js), EduNest supports class management, student enrollment, teacher requests, assignments, feedback, and a role-based dashboard system – all with a clean, responsive UI.

📍 **Live Site**: [EduNest Live Link](https://edunest-3378e.web.app/)

---

## 🚀 Main Features

## 🔑 Key Features:

Role-Based Dashboards – Separate dashboards for Students, Teachers, and Admins.

✅ Student Features –

Enroll in courses (Stripe-powered payments)

View enrolled classes and progress

Submit assignments & provide course feedback

✅ Teacher Features –

Add and manage courses

Create assignments for students

View student submissions and feedback

✅ Admin Features –

Approve or reject teacher and class requests

Manage users & platform statistics

Control which classes are visible on the site

✅ Authentication & Authorization –

Firebase Authentication (Email/Password + Google Login)

JWT-secured API routes

✅ Responsive Design – Works perfectly on desktop, tablet, and mobile using Tailwind CSS + DaisyUI

✅ Modern UI Enhancements –

Smooth animations with Framer Motion

Icons via React Icons

Dashboard cards and tables for quick insights

### 🔍 Explore Listings

- Browse and filter courses by category, level, and language

- Secure login for students, teachers, and admins

- Teacher request system for users who want to become instructors

- Track platform growth with real-time statistics (total users, total enrollments, total classes)

### 🔒 Secure Matching & Contact System

- Firebase-authenticated users only
- Privacy-first messaging & saved favorites

### ⚙️ Tech Stack

🔧 Frontend
⚛ React.js with Vite

🎨 Tailwind CSS + DaisyUI

🔥 Firebase Auth for authentication

⚡ TanStack Query for API calls

🖌 Framer Motion for animations

### 🧰 Backend

🌐 Node.js + Express.js REST API

🗄 MongoDB (Native Driver)

🔑 JWT for secure routes

💳 Stripe API for payments

### 📦 Dependencies

axios

firebase

framer-motion

react-router-dom

react-icons

sweetalert2

tailwindcss + daisyui

## 📦 Dependencies

- `@tailwindcss/vite`
- `axios`
- `firebase`
- `framer-motion`
- `moment`
- `react`
- `react-datepicker`
- `react-dom`
- `react-icons`
- `react-router`
- `react-simple-typewriter`
- `sweetalert2`
- `swiper`
- `tailwindcss`
- `stripe`
- `@tanstack/react-query`

---

### 🖥️ Local Setup Guide

### 📁 Clone the repository on terminal or bash

- git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MdNurulIslam99
- cd created own folder name

### 📦 Install dependencies on terminal or bash

- npm install

### 🔐 Setup environment

- Create a .env file in the root and add your Firebase config:

- VITE_API_KEY=your_api_key
- VITE_AUTH_DOMAIN=your_auth_domain
- VITE_PROJECT_ID=your_project_id
- VITE_STORAGE_BUCKET=your_storage_bucket
- VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
- VITE_APP_ID=your_app_id

### ▶️ Run the frontend app

- npm run dev

### 🖥️ Run the backend (if in separate repo)

- cd created own folder name
- npm install
- npm run dev

### 🔗 Useful Links

🔴 Live Site: https://edunest-3378e.web.app/

🟡 Client Repository: https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MdNurulIslam99

🔵 Server Repository: https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-MdNurulIslam99

#### 🌟 What Makes EduNest Stand Out?

✅ All-in-one solution for students, teachers, and admins
✅ Stripe-powered payments for course enrollment
✅ Full CRUD functionality for courses, assignments, and feedback
✅ Role-based access system for secure management
✅ Clean and modern UI with smooth animations and responsive design

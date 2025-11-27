# 💡 Smart Bill Management System (Next.js + Clerk Auth)

A **full-stack Next.js web application** that allows users to **view, manage, and pay monthly utility bills** (Electricity, Gas, Water, Internet, etc.).
Users can **securely authenticate using Clerk**, **pay only current-month bills**, and **manage their payment history** with options to **update, delete, and download PDF reports**.
The application ensures a smooth, fast, and fully responsive experience on all devices.

---

## 🌐 Live Demo & Repositories

* 🔗 **Live Site:** [https://smart-bills-next.vercel.app/](https://smart-bills-next.vercel.app/)
* 💻 **Client Repo (Next.js):** [https://github.com/fardinislamselim/smart-bills-next](https://github.com/fardinislamselim/smart-bills-next)
* ⚙️ **Server / API Repo:** [https://github.com/mdfardinislamselim/smart-bills-server](https://github.com/mdfardinislamselim/smart-bills-server)

---

## 🎯 Key Features

* 🔐 **Authentication with Clerk**

  * Secure Sign In / Sign Up
  * Social login support
  * Protected routes with middleware

* 💰 **Bill Payment System**

  * Only **current-month bills** can be paid
  * Auto-filled Pay Bill modal (User Email, Bill ID, Amount, Date)

* 📄 **PDF Report Generation**

  * Download paid bills as **PDF**
  * Powered by **jsPDF + AutoTable**

* ⚙️ **Full CRUD Operations**

  * Update & Delete paid bills using dynamic modals
  * Real-time UI updates

* 🌗 **Dark / Light Theme Toggle**

* 🧭 **Dynamic Routing & Private Routes**

  * Next.js App Router
  * Clerk protected routes

* 📊 **Payment Summary Dashboard**

  * Total Bills Paid
  * Total Amount Paid

* 📱 **Fully Responsive Design**

* 🔔 **Toast & SweetAlert Notifications**

---

## 🖼️ Layout Overview

### 🧩 Navbar

**Before Login:** Home | Bills | Sign In | Sign Up
**After Login:** Home | Bills | My Pay Bills | Profile | Logout

### 🏠 Home Page

* Image **Carousel Slider**
* **Bill Categories**: Electricity, Gas, Water, Internet
* **Recent Bills** (Latest 6 from database)
* **How It Works** section
* **User Testimonials**

### 💵 Bills Page (Public)

* All bills displayed in **3-column grid**
* **Category filter dropdown**

### 📋 Bill Details Page (Protected)

* Full bill information
* **Pay Bill Button** works only if the bill month = current month
* Secure payment modal with pre-filled data

### 🧾 My Pay Bills Page (Protected)

* User-specific payment history (table view)
* **Edit / Delete bills**
* **Download PDF Report**
* **Total Paid Summary**

---

## 🛠️ Tech Stack

### Frontend (Client)

* **Next.js 14+ (App Router)**
* React
* **Clerk Authentication**
* Axios (with interceptors)
* Tailwind CSS / DaisyUI
* jsPDF + jsPDF-AutoTable
* React Toastify / SweetAlert2
* Framer Motion / Lottie React

### Backend (Server / API)

* Node.js + Express.js
* MongoDB
* dotenv
* cors
* bcrypt
* Firebase Admin / Custom Verification (if used for legacy)

---

## 📦 Project Dependencies

### Client (Next.js)

```json
"dependencies": {
  "next": "^16.0.5",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "@clerk/nextjs": "^5.0.0",
  "axios": "^1.6.0",
  "react-toastify": "^9.2.2",
  "sweetalert2": "^11.8.2",
  "lottie-react": "^2.3.1",
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.5.25"
},
"devDependencies": {
  "tailwindcss": "^4.0.0",
  "daisyui": "^3.2.2"
}
```

### Server

```json
"dependencies": {
  "express": "^4.18.2",
  "mongodb": "^6.10.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "bcrypt": "^5.1.0"
}
```

---

## 🚀 Local Setup Guide

### 1️⃣ Clone the Repositories

```bash
# Client (Next.js)
git clone [https://github.com/mdfardinislamselim/smart-bills-client.git](https://github.com/fardinislamselim/smart-bills-next.git)

# Server
git clone https://github.com/mdfardinislamselim/smart-bills-server.git
```

---

### 2️⃣ Install Dependencies

```bash
# Client
cd smart-bills-client
npm install

# Server
cd smart-bills-server
npm install
```

---

### 3️⃣ Environment Variables

#### ✅ Server `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

#### ✅ Client `.env.local` (Clerk + Next.js)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 4️⃣ Run the Application

```bash
# Server
cd smart-bills-server
npm run dev   # or: node index.js

# Client (Next.js)
cd smart-bills-client
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## ✅ Future Improvements (Optional Section)

* Online payment gateway integration (SSLCommerz / Stripe)
* Admin dashboard
* Bill reminder notifications (Email / SMS)
* Multi-language support

---

## 👨‍💻 Author

**Md Fardin Islam Selim**
Full-Stack Web Developer
GitHub: [https://github.com/mdfardinislamselim](https://github.com/mdfardinislamselim)

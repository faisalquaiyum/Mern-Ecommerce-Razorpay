# MERN E-Commerce Razorpay 

A full-stack E-Commerce web app with Razorpay integration for payments — built using the MERN stack (MongoDB, Express, React, Node.js) and deployed on Render + Vercel.

---

## ⚙️ Features

- User authentication using JWT
- Product listing and details page
- Add to cart and address management
- Razorpay Test Mode payment gateway integration
- Admin/user-based API routes
- Fully deployed frontend and backend

---

## ✨ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/faisalquaiyum/mern-ecommerce-razorpay.git
cd mern-ecommerce-razorpay
```

---

### 2. Backend Setup (`/server`)

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret
```

Run the backend locally:

```bash
npm run dev
```

---

### 3. Frontend Setup (`/client`)

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_URL_API=https://mern-ecommerce-razorpay.onrender.com/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Run the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧱 Tech Stack

- **Frontend:** React (Vite), TailwindCSS, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Deployment:** Vercel (frontend), Render (backend)
- **Payments:** Razorpay (Test Mode)
- **Tools:** dotenv, cors, axios, express middleware

---

## 📁 Project Structure

```
mern-ecommerce-razorpay/
├── client/           # Frontend
│   ├── src/
│   ├── .env
│   └── vite.config.js
├── server/           # Backend
│   ├── Routes/
│   ├── Models/
│   ├── Controllers/
│   ├── .env
│   └── server.js
└── README.md
```

---

## 🚀 Deployment

### Frontend (Vercel)

1. Fork this repo and import it into [Vercel](https://vercel.com/).
2. Set the following environment variable:

```env
VITE_URL_API=https://mern-ecommerce-razorpay.onrender.com/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

3. Deploy and access your app at `https://your-project.vercel.app`.

---

### Backend (Render)

1. Create a new **Web Service** on [Render](https://render.com/).
2. Connect your GitHub repo and select the `/server` folder.
3. Set environment variables:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret
```

4. Set build command:

```bash
npm install
```

5. Set start command:

```bash
npm start
```

6. Deploy and get your backend URL like `https://mern-ecommerce-razorpay.onrender.com`

---

## 🔢 Environment Variables

### Backend (`/server/.env`)

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret
```

### Frontend (`/client/.env`)

```env
VITE_URL_API=https://mern-ecommerce-razorpay.onrender.com/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 🙌 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/NewFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add NewFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/NewFeature
   ```
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Render for backend hosting
- Vercel for frontend deployment
- MongoDB Atlas for cloud DB
- Razorpay for test mode payments
- Developed by **Md Faisal Quaiyum**
- GitHub: [https://github.com/faisalquaiyum](https://github.com/faisalquaiyum)

# Multi-Vendor Order Management System (Backend)

This is a backend system for managing a multi-vendor marketplace. It supports:
- JWT authentication with role-based access control (`customer`, `vendor`, `admin`)
- Product management by vendors
- Order placement across multiple vendors with transaction-safe operations
- Admin and vendor analytics

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for Auth
- Bcrypt for password hashing
- Joi for validation (coming soon)
- Docker & Swagger (optional setup included)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/multi-vendor-backend.git
cd multi-vendor-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file using the example provided:

```bash
cp .env.example .env
```

Edit `.env` and update MongoDB connection URI and JWT secret.

### 4. Run the Server
```bash
npm run dev
```

## 🛠 API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/products` (vendor-only, secure)
- `POST /api/orders` (multi-vendor order placement)

More routes and Swagger docs coming soon!

---

## 📂 Folder Structure

```
multi-vendor-backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env.example
├── README.md
├── app.js
└── server.js
```

## 🧪 Future Enhancements

- Analytics: Sales, Revenue, Order Value
- Swagger Docs
- Redis Caching
- Unit Testing

---

© 2025 Bharat — Built for scale and learning.

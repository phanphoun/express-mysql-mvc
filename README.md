# Express MySQL MVC Boilerplate

A robust and scalable backend architecture for Node.js applications, following the Model-View-Controller (MVC) pattern and using MySQL as the primary database.

## 🚀 Project Overview

This project provides a clean starting point for building production-ready REST APIs. It emphasizes separation of concerns, secure authentication, and optimized database management.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Architecture**: MVC (Model-View-Controller)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt, Rate Limiting, CORS

## 📁 Project Structure

```
express-mysql-mvc/
├── src/
│   ├── controllers/   # Request handlers and business logic
│   ├── models/        # Database schemas and operations
│   ├── routes/        # API endpoints and routing
│   ├── middleware/    # Custom middlewares (auth, validation)
│   ├── config/        # Database and environment configurations
│   └── app.js         # Express app initialization
├── .env               # Environment variables
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16+)
- MySQL (v5.7+ or MariaDB)

### Installation

1. **Clone the repo**:
   ```bash
   git clone https://github.com/phanphoun/express-mysql-mvc.git
   cd express-mysql-mvc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Database**:
   Create a MySQL database and update the credentials in your `.env` file.

4. **Run the app**:
   ```bash
   npm start
   ```

## 🛡 Security Features

- **JWT Auth**: Secure user sessions with token-based authentication.
- **Input Validation**: Prevents malicious data and SQL injection.
- **Rate Limiting**: Protects against brute-force attacks.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
# Express MySQL MVC - OOP

A RESTful API built with Express.js, MySQL, following MVC (Model-View-Controller) architecture and Object-Oriented Programming principles.

## Features

- **MVC Architecture**: Clean separation of concerns with Models, Controllers, and Routes
- **OOP Principles**: Class-based design with inheritance
- **Static Methods**: Efficient model operations using static methods
- **Async/Await**: Modern asynchronous JavaScript patterns
- **Error Handling**: Comprehensive try/catch blocks
- **Password Hashing**: Secure password storage with bcrypt
- **CORS Enabled**: Cross-origin resource sharing support
- **Environment Variables**: Secure configuration management

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## Project Structure

```
express-mysql-mvc/
├── src/
│   ├── config/
│   │   └── db.js              # Database configuration and connection
│   ├── controllers/
│   │   ├── BaseController.js  # Base controller with common response methods
│   │   └── UserController.js  # User-specific controller methods
│   ├── models/
│   │   ├── BaseModel.js       # Base model with CRUD operations
│   │   └── User.js            # User model extending BaseModel
│   ├── routes/
│   │   └── userRoutes.js      # User API routes
│   └── app.js                 # Express app setup and server startup
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/phanphoun/express-mysql-mvc.git
cd express-mysql-mvc
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

4. Create MySQL database:
```sql
CREATE DATABASE your_database_name;
USE your_database_name;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### User Routes

Base URL: `http://localhost:3000/api/users`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/users` | Get all users | - |
| GET | `/api/users/:id` | Get user by ID | - |
| POST | `/api/users` | Create new user | `{ "name": "string", "email": "string", "password": "string" }` |
| PUT | `/api/users/:id` | Update user by ID | `{ "name": "string", "email": "string", "password": "string" }` |
| DELETE | `/api/users/:id` | Delete user by ID | - |

### Example Requests

**Get all users:**
```bash
curl http://localhost:3000/api/users
```

**Get user by ID:**
```bash
curl http://localhost:3000/api/users/1
```

**Create user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Update user:**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","email":"john.updated@example.com"}'
```

**Delete user:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## OOP & MVC Implementation

### MVC Pattern
- **Model**: Handles database operations and data logic
- **Controller**: Handles HTTP requests and responses
- **Routes**: Defines API endpoints and maps to controllers

### OOP Concepts Applied
1. **Classes**: BaseModel, User, BaseController, UserController
2. **Inheritance**: User extends BaseModel, UserController extends BaseController
3. **Static Methods**: All model and controller methods are static
4. **Encapsulation**: Private methods with underscore prefix (e.g., `_validateEmail`)
5. **Destructuring**: Used for objects, arrays, and spread operator
6. **ES6 Modules**: Import/export for modular code organization
7. **Async/Await**: Modern asynchronous patterns
8. **Try/Catch**: Comprehensive error handling

## Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## License

ISC

## Author

PHOUN.PHAN

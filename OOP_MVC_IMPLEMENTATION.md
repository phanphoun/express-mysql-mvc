# OOP and MVC Implementation Guide

This document demonstrates how OOP and MVC concepts are applied in this Express MySQL MVC project.

## 1. MVC Pattern (Model-View-Controller)

### Model Layer
- **Location**: `src/models/`
- **Files**: `BaseModel.js`, `User.js`
- **Purpose**: Handle database operations and data logic

### Controller Layer
- **Location**: `src/controllers/`
- **Files**: `BaseController.js`, `UserController.js`
- **Purpose**: Handle HTTP requests and responses

### Routes Layer
- **Location**: `src/routes/`
- **Files**: `userRoutes.js`
- **Purpose**: Define API endpoints and map to controllers

### View Layer
- **Note**: This is a REST API project, so views are JSON responses handled by controllers

---

## 2. Class (Object-Oriented Programming)

### BaseModel Class
```javascript
// src/models/BaseModel.js
class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }
    // ... methods
}
```

### User Class (Inheritance)
```javascript
// src/models/User.js
class User extends BaseModel {
    static tableName = 'users';
    // ... methods
}
```

### BaseController Class
```javascript
// src/controllers/BaseController.js
class BaseController {
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }
    // ... methods
}
```

### UserController Class (Inheritance)
```javascript
// src/controllers/UserController.js
class UserController extends BaseController {
    static async getAllUsers(req, res) {
        // ... implementation
    }
    // ... methods
}
```

---

## 3. Static Methods in Model

### BaseModel Static Methods
```javascript
// src/models/BaseModel.js
static async findAll(tableName) {
    try {
        this._validateTableName(tableName);
        const query = `SELECT * FROM ${tableName}`;
        const results = await db.query(query);
        return results;
    } catch (error) {
        throw new Error(`Error fetching records: ${error.message}`);
    }
}

static async findById(tableName, id) {
    try {
        this._validateTableName(tableName);
        const query = `SELECT * FROM ${tableName} WHERE id = ?`;
        const results = await db.query(query, [id]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw new Error(`Error fetching record: ${error.message}`);
    }
}

static async create(tableName, data) {
    try {
        this._validateTableName(tableName);
        const { columns, placeholders, values } = this._prepareInsertData(data);
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        const result = await db.query(query, values);
        return { id: result.insertId, ...data };
    } catch (error) {
        throw new Error(`Error creating record: ${error.message}`);
    }
}

static async update(tableName, id, data) {
    try {
        this._validateTableName(tableName);
        const { setClause, values } = this._prepareUpdateData(data);
        const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
        await db.query(query, [...values, id]);
        return { id, ...data };
    } catch (error) {
        throw new Error(`Error updating record: ${error.message}`);
    }
}

static async delete(tableName, id) {
    try {
        this._validateTableName(tableName);
        const query = `DELETE FROM ${tableName} WHERE id = ?`;
        await db.query(query, [id]);
        return { message: 'Record deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting record: ${error.message}`);
    }
}
```

### User Model Static Methods (Inheritance)
```javascript
// src/models/User.js
class User extends BaseModel {
    static tableName = 'users';

    static async findAll() {
        return await super.findAll(this.tableName);
    }

    static async findById(id) {
        return await super.findById(this.tableName, id);
    }

    static async create(data) {
        return await super.create(this.tableName, data);
    }

    static async update(id, data) {
        return await super.update(this.tableName, id, data);
    }

    static async delete(id) {
        return await super.delete(this.tableName, id);
    }
}
```

---

## 4. Create Method in Controller

### Controller Methods
```javascript
// src/controllers/UserController.js
class UserController extends BaseController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            BaseController.success(res, users, 'Users retrieved successfully');
        } catch (error) {
            BaseController.error(res, error.message);
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return BaseController.notFound(res, 'User not found');
            }

            BaseController.success(res, user, 'User retrieved successfully');
        } catch (error) {
            BaseController.error(res, error.message);
        }
    }

    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return BaseController.error(res, 'Name, email, and password are required', 400);
            }

            if (!UserController._validateEmail(email)) {
                return BaseController.error(res, 'Invalid email format', 400);
            }

            const hashedPassword = await UserController._hashPassword(password);
            const userData = { name, email, password: hashedPassword };
            const user = await User.create(userData);

            BaseController.created(res, user, 'User created successfully');
        } catch (error) {
            BaseController.error(res, error.message);
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            if (!name || !email) {
                return BaseController.error(res, 'Name and email are required', 400);
            }

            if (!UserController._validateEmail(email)) {
                return BaseController.error(res, 'Invalid email format', 400);
            }

            const existingUser = await User.findById(id);
            if (!existingUser) {
                return BaseController.notFound(res, 'User not found');
            }

            const userData = { name, email };
            if (password) {
                userData.password = await UserController._hashPassword(password);
            }

            const user = await User.update(id, userData);
            BaseController.success(res, user, 'User updated successfully');
        } catch (error) {
            BaseController.error(res, error.message);
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const existingUser = await User.findById(id);
            if (!existingUser) {
                return BaseController.notFound(res, 'User not found');
            }

            const result = await User.delete(id);
            BaseController.success(res, result, 'User deleted successfully');
        } catch (error) {
            BaseController.error(res, error.message);
        }
    }
}
```

---

## 5. Destructuring Objects and Arrays

### Object Destructuring
```javascript
// In Controllers - destructuring request parameters and body
const { id } = req.params;           // Destructure id from params
const { name, email, password } = req.body;  // Destructure from body

// In Models - destructuring returned objects
const { columns, placeholders, values } = this._prepareInsertData(data);
const { setClause, values } = this._prepareUpdateData(data);
```

### Array Destructuring
```javascript
// In Models - destructuring array results
const [results] = await this.pool.execute(sql, params);  // Destructure first element
return results.length > 0 ? results[0] : null;  // Access array elements
```

### Spread Operator
```javascript
// In Models - spreading objects
return { id: result.insertId, ...data };  // Spread data object
return { id, ...data };  // Spread data object

// In Routes - spreading arrays in query parameters
await db.query(query, [...values, id]);  // Spread values array
```

---

## 6. Import/Export Modules

### ES6 Module Exports
```javascript
// Default exports
export default BaseModel;      // src/models/BaseModel.js
export default User;           // src/models/User.js
export default BaseController;  // src/controllers/BaseController.js
export default UserController;  // src/controllers/UserController.js
export default router;         // src/routes/userRoutes.js
export default db;             // src/config/db.js
```

### ES6 Module Imports
```javascript
// Named imports (if needed)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';

// Default imports
import BaseModel from './BaseModel.js';
import User from '../models/User.js';
import BaseController from './BaseController.js';
import userRoutes from './routes/userRoutes.js';
import db from '../config/db.js';
```

---

## 7. Async/Await

### Async/Await in Models
```javascript
// src/models/BaseModel.js
static async findAll(tableName) {
    try {
        this._validateTableName(tableName);
        const query = `SELECT * FROM ${tableName}`;
        const results = await db.query(query);  // Await async operation
        return results;
    } catch (error) {
        throw new Error(`Error fetching records: ${error.message}`);
    }
}

static async findById(tableName, id) {
    try {
        this._validateTableName(tableName);
        const query = `SELECT * FROM ${tableName} WHERE id = ?`;
        const results = await db.query(query, [id]);  // Await async operation
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw new Error(`Error fetching record: ${error.message}`);
    }
}
```

### Async/Await in Controllers
```javascript
// src/controllers/UserController.js
static async getAllUsers(req, res) {
    try {
        const users = await User.findAll();  // Await async model call
        BaseController.success(res, users, 'Users retrieved successfully');
    } catch (error) {
        BaseController.error(res, error.message);
    }
}

static async createUser(req, res) {
    try {
        const hashedPassword = await UserController._hashPassword(password);  // Await async hashing
        const userData = { name, email, password: hashedPassword };
        const user = await User.create(userData);  // Await async model call
        BaseController.created(res, user, 'User created successfully');
    } catch (error) {
        BaseController.error(res, error.message);
    }
}
```

### Async/Await in Database Connection
```javascript
// src/app.js
const startServer = async () => {
    try {
        await db.getConnection();  // Await async database connection
        console.log('Database connected successfully');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};
```

---

## 8. Try/Catch Error Handling

### Try/Catch in Models
```javascript
static async findAll(tableName) {
    try {
        this._validateTableName(tableName);
        const query = `SELECT * FROM ${tableName}`;
        const results = await db.query(query);
        return results;
    } catch (error) {
        throw new Error(`Error fetching records: ${error.message}`);  // Catch and re-throw
    }
}
```

### Try/Catch in Controllers
```javascript
static async getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        BaseController.success(res, users, 'Users retrieved successfully');
    } catch (error) {
        BaseController.error(res, error.message);  // Catch and return error response
    }
}

static async createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return BaseController.error(res, 'Name, email, and password are required', 400);
        }

        const hashedPassword = await UserController._hashPassword(password);
        const userData = { name, email, password: hashedPassword };
        const user = await User.create(userData);

        BaseController.created(res, user, 'User created successfully');
    } catch (error) {
        BaseController.error(res, error.message);  // Catch and return error response
    }
}
```

### Try/Catch in Database Connection
```javascript
// src/app.js
const startServer = async () => {
    try {
        await db.getConnection();
        console.log('Database connected successfully');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);  // Catch startup errors
        process.exit(1);
    }
};
```

### Try/Catch in Database Query
```javascript
// src/config/db.js
async query(sql, params = []) {
    try {
        const [results] = await this.pool.execute(sql, params);
        return results;
    } catch (error) {
        throw new Error(`Database query error: ${error.message}`);  // Catch and re-throw
    }
}
```

---

## Summary

All OOP and MVC concepts are properly implemented in this project:

1. ✅ **MVC Pattern**: Clear separation of concerns with Models, Controllers, and Routes
2. ✅ **Class**: Used throughout with inheritance (BaseModel → User, BaseController → UserController)
3. ✅ **Static Methods in Model**: All model methods are static for database operations
4. ✅ **Create Method in Controller**: All CRUD methods implemented in controllers
5. ✅ **Destructuring**: Used for objects, arrays, and spread operator throughout
6. ✅ **Import/Export Modules**: ES6 modules used consistently
7. ✅ **Async/Await**: All async operations use async/await pattern
8. ✅ **Try/Catch**: Comprehensive error handling in all async methods

The project follows best practices for building a scalable, maintainable Express.js API with MySQL using OOP and MVC principles.

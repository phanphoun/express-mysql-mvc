
import User from '../models/User.js';
import BaseController from './BaseController.js';
import bcrypt from 'bcrypt';

class UserController extends BaseController {
    // Email validation helper
    static _validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Hash password helper
    static async _hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

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

            // Check if user exists
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

            // Check if user exists
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

export default UserController;

import User from '../model/user.js';

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({
                message: 'Users retrieved successfully',
                data: users
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving users',
                error: error.message
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json({
                message: 'User retrieved successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving user',
                error: error.message
            });
        }
    }

    static async createUser(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const userData = { name, email, password, role };

            const user = await User.create(userData);

            res.status(201).json({
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating user',
                error: error.message
            });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;
            const userData = { name, email, password, role };

            const user = await User.update(id, userData);

            res.status(200).json({
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error updating user',
                error: error.message
            });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await User.delete(id);

            res.status(200).json({
                message: result.message
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error deleting user',
                error: error.message
            });
        }
    }
}

export default UserController;

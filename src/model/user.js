import Database from '../config/db.js';

class User {
    static async findAll() {
        try {
            const db = await Database.getInstance();
            const sql = 'SELECT * FROM users';
            const results = await db.query(sql, []);
            return results;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const db = await Database.getInstance();
            const sql = 'SELECT * FROM users WHERE id = ?';
            const results = await db.query(sql, [id]);
            return results[0];
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    static async create({ name, email, password, role = 'user' }) {
        try {
            const db = await Database.getInstance();
            const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
            const results = await db.query(sql, [name, email, password, role]);
            return { id: results.insertId, name, email, role };
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    static async update(id, { name, email, password, role }) {
        try {
            const db = await Database.getInstance();
            const sql = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
            await db.query(sql, [name, email, password, role, id]);
            return { id, name, email, role };
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const db = await Database.getInstance();
            const sql = 'DELETE FROM users WHERE id = ?';
            await db.query(sql, [id]);
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default User;
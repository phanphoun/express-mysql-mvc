import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async query(sql, params = []) {
        try {
            const [results] = await this.pool.execute(sql, params);
            return results;
        } catch (error) {
            throw new Error(`Database query error: ${error.message}`);
        }
    }

    async getConnection() {
        return await this.pool.getConnection();
    }
}

const db = Database.getInstance();

export default db;
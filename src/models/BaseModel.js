import db from '../config/db.js';

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    // Whitelist allowed table names to prevent SQL injection
    static _validateTableName(tableName) {
        const allowedTables = ['users']; // Add other allowed tables here
        if (!allowedTables.includes(tableName)) {
            throw new Error(`Invalid table name: ${tableName}`);
        }
        return true;
    }

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

    static _prepareInsertData(data) {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        return { columns, placeholders, values };
    }

    static _prepareUpdateData(data) {
        const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data);
        return { setClause, values };
    }
}

export default BaseModel;

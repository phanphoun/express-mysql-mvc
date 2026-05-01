import BaseModel from './BaseModel.js';

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

export default User;
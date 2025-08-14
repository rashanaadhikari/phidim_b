import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model { }

User.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('customer', 'worker', 'admin'), defaultValue: 'customer' },
    status: { type: DataTypes.ENUM('active', 'inactive', 'busy'), defaultValue: 'inactive' },
    isKycVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isKycEditApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    rate: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
}, { sequelize, modelName: 'User' });

export default User;



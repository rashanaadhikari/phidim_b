import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Kyc extends Model {}

Kyc.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  skills: { type: DataTypes.TEXT },
  experience: { type: DataTypes.TEXT },
  idProof: { type: DataTypes.STRING },
  serviceArea: { type: DataTypes.STRING },
  rate: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  editedData: { type: DataTypes.JSON, allowNull: true },
}, { sequelize, modelName: 'Kyc' });

export default Kyc;

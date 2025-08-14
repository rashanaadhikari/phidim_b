import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Kyc extends Model {}

Kyc.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  experience: { type: DataTypes.STRING },
  serviceArea: { type: DataTypes.STRING },
  identityImage: { type: DataTypes.JSON },
  skillImage :{type : DataTypes.JSON},
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  editedData: { type: DataTypes.JSON, allowNull: true },
}, { sequelize, modelName: 'Kyc' });

export default Kyc;

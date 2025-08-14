import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Invoice extends Model {}

Invoice.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bookingId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  customerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  workerId: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { sequelize, modelName: 'Invoice' });

export default Invoice;





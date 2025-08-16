import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Booking extends Model {}

Booking.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  customerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  workerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'confirmed'), defaultValue: 'pending' },
  proposedPrice: { type: DataTypes.DECIMAL(10, 2) },
  location: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  contact : {type :DataTypes.STRING},
  image: { type: DataTypes.STRING },
  forCustomer : {type:DataTypes.BOOLEAN, defaultValue:true},
  forWorker : {type : DataTypes.BOOLEAN, defaultValue:true}
}, { sequelize, modelName: 'Booking' });

export default Booking;

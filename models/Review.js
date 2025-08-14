import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Review extends Model {}

Review.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bookingId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  reviewerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  workerId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  review: { type: DataTypes.TEXT },
}, { sequelize, modelName: 'Review' });

export default Review;

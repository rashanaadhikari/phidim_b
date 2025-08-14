// models/Skill.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Skill extends Model {}

Skill.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { sequelize, modelName: 'Skill' });

export default Skill;








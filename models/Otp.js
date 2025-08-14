import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";



class Otp extends Model {}


Otp.init({
    email : {type :DataTypes.STRING, allowNull: false, unique: true},
    otp : {type :DataTypes.STRING, allowNull: false},
    expiresAt : {type :DataTypes.DATE},
    tempData : DataTypes.JSON
},{
    sequelize,
    modelName: 'Otp',
    hooks: {
        beforeCreate: (otp) => {
            otp.expiresAt = new Date(Date.now() + 30 * 60 * 1000); // OTP valid for 10 minutes
        }
    }
});

export default Otp;
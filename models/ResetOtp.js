import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";



class Otp extends Model {}


Otp.init({
    
    email : {type :DataTypes.STRING, allowNull: false, unique: true},
    otp : {type :DataTypes.STRING, allowNull: false},
    expiresAt : {type :DataTypes.DATE},
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
},{
    sequelize,
    modelName: 'ResetOtp', 
    hooks: {
        beforeCreate: (otp) => {
            otp.expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        }
    }
});

export default Otp;
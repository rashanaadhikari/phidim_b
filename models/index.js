// models/index.js
import sequelize from '../config/db.js';
import User from './User.js';
import Kyc from './Kyc.js';
import Booking from './Booking.js';
import Invoice from './Invoice.js';
import Review from './Review.js';
import Otp from './Otp.js';
import Skill from './Skill.js';
import ResetOtp from './ResetOtp.js';

// Associations  ARE HERE

// User associations with KYC
User.hasOne(Kyc, { foreignKey: 'userId' });
Kyc.belongsTo(User, { foreignKey: 'userId' });


// Booking associations with User
User.hasMany(Booking, { foreignKey: 'customerId', as: 'customerBookings' });
User.hasMany(Booking, { foreignKey: 'workerId', as: 'workerBookings' });
Booking.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Booking.belongsTo(User, { foreignKey: 'workerId', as: 'worker' });

// Invoice associations withBooking
Booking.hasOne(Invoice, { foreignKey: 'bookingId' });
Invoice.belongsTo(Booking, { foreignKey: 'bookingId' });

// Review associations with Booking
Booking.hasMany(Review, { foreignKey: 'bookingId' });
Review.belongsTo(Booking, { foreignKey: 'bookingId' });




// A KYC can have many Skills
Kyc.belongsToMany(Skill, { through: 'KycSkills', foreignKey: 'kycId', otherKey: 'skillId' });

// A Skill can belong to many KYC records
Skill.belongsToMany(Kyc, { through: 'KycSkills', foreignKey: 'skillId', otherKey: 'kycId' });


export {
  sequelize,
  User,
  Kyc,
  Booking,
  Invoice,
  Review,
  Skill,
  Otp,
  ResetOtp
};

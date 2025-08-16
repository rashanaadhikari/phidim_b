import express from 'express';
import { sequelize } from './models/index.js';
import { env } from './helpers/constants.js';
import cookieParser from 'cookie-parser';


const app = express();


import authRoutes from './routes/authRoutes.js'; 
import skillRoutes from './routes/skillRoutes.js'; 
import kycRoutes from './routes/kycRoutes.js'; 
import  bookingRoutes from './routes/bookingRoutes.js'





app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

// Sync models (drop and recreate tables if force: true)
await sequelize.sync({ alter:false});

// Enable FK checks again
// await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');


// sequelize.sync({ force: true })
//   .then(() => {
  //     console.log('Database & tables synced!');
  //   })
  //   .catch(err => console.error('DB Sync Error:', err));
  
  //Routes can be imported here
  
  
  
  
  
  
  //Routes can be defined here
  app.use('/api/auth', authRoutes); 
  app.use('/api/skill',skillRoutes)
  app.use('/api/kyc',kycRoutes)
  app.use('/api/booking',bookingRoutes)







const PORT = env.PORT;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});

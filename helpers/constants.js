
import dotenv from "dotenv";


dotenv.config();

export const env = {
  PORT: process.env.PORT || 3200,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  DB_NAME: process.env.DB_NAME || "phidim_db",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_HOST: process.env.DB_HOST || "127.0.0.1",

  // Auth
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "hello",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "haha",
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "3",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "60d",
 


  // Cloudinary
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || "",

  // Platform
  PLATFORM_EMAIL: process.env.PLATFORM_EMAIL || "",
  PLATFORM_PASSWORD: process.env.PLATFORM_PASSWORD || "",
};

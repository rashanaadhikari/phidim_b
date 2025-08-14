import express from "express";
import { forgotPassword, login, logout, register, resetPassword, verifyOtp, verifyResetOtp } from "../controllers/authController.js";


const router = express.Router();


router.post("/register", register)
router.post('/verifyOtp', verifyOtp); 
router.post('/login',login)
router.post('/logout',logout)
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetOtp', verifyResetOtp); 
router.post('/resetPassword', resetPassword); 



export default router;




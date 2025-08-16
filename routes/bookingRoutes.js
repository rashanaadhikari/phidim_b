import express from "express";
import { createBooking, getAllBookingByUser, getAllBookingByWorker } from "../controllers/bookingController.js";
import { upload } from "../utils/storage.js";
import { isLoggedIn, isWorker } from "../middlewares/authMiddleware.js";

const router = express.Router()


router.post('/create/:workerId',isLoggedIn,upload.single("image"),createBooking)
router.get('/getAlltByUser',isLoggedIn,getAllBookingByUser)
router.get('/getAllByWorker',isWorker,getAllBookingByWorker)



export default router

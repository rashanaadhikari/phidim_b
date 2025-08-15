import express from "express";
import { approveKyc, createKyc, deleteKyc, getAllKyc, getKycById, getKycByUser, requestUpdateKyc } from "../controllers/kycController.js";
import { upload } from "../utils/storage.js";
import { isLoggedIn, isWorker } from "../middlewares/authMiddleware.js";




const router = express.Router();

const imageField = [
  { name: 'skillImages', maxCount: 3 },
  { name: 'identityImages', maxCount: 2 }
]


router.post('/create',isLoggedIn,upload.fields(imageField),createKyc)
router.put('/requestUpdate',isLoggedIn,upload.fields(imageField),requestUpdateKyc)
router.put('/approve/:kycId',approveKyc)
router.get('/byUser',isWorker,getKycByUser)
router.get('/getAll',getAllKyc)
router.delete('/deleteKyc',deleteKyc)
router.get('/:kycId',getKycById)



export default router;




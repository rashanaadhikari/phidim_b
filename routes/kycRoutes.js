import express from "express";
import { createKyc } from "../controllers/kycController.js";
import { upload } from "../utils/storage.js";
import { generateFilenamesFromFiles } from "../utils/generate.js";




const router = express.Router();


router.get('/create',createKyc)

router.post('/test',upload.fields([
  { name: 'skillImage', maxCount: 3 },
  { name: 'identityImage', maxCount: 2 }
]),(req,res)=>{
    // console.log(req.files,req.body)
    





const files = req.files

    const {skillImage,identityImage} = generateFilenamesFromFiles(files)

    

    res.json({skillImage,identityImage})
   
})


export default router;




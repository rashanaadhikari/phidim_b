import express from "express";
import { createSkill, deleteSkill, getAllSkill, getSkillById, updateSkill } from "../controllers/skillController.js";



const router = express.Router();


router.post('/create',createSkill)
router.put('/update/:skillId',updateSkill)
router.get('/getAll',getAllSkill)
router.get('/get/:skillId',getSkillById)
router.delete('/delete/:skillId',deleteSkill)



export default router;




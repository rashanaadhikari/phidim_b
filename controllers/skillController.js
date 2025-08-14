import { ValidationError } from "sequelize";
import { createSkillService, deleteSkillService, getAllSkillsService, getSkillByIdService, updateSkillService } from "../services/skillService.js";
import { errorResponse, successResponse, validationErrorResponse } from "../utils/handleResponse.js";


export const createSkill =  async (req,res)=>{
    try {
        const skillData = req.body.skills;
      

        if(!skillData || !Array.isArray(skillData) || skillData.length === 0) {
            return validationErrorResponse(res,"!skillData is required and should be an array");
        }
        const skill = await createSkillService(skillData);
        
        return successResponse(res,skill);

    } catch (error) {
        console.error("Error creating skill:", error);
        return  errorResponse(res,error)
    }
}


export const  updateSkill = async(req,res)=>{
    
    try {
        const skillId = req.params.skillId
        const {skill} = req.body
        

    if(!skillId) {
        return validationErrorResponse(res,"skillId missing ")
    }
    if(!skill) {
        return validationErrorResponse(res,"skill missing ")
    }
   
    const result = await updateSkillService(skillId,skill)
    if(!result){
        throw new Error("Failed to update skill")
    }
    return  successResponse(res,result)
    } catch (error) {
        errorResponse(res,error)
    }
}


export const getAllSkill = async(req,res)=>{

    try {
        const data = await getAllSkillsService()
        if(!data){throw new Error("Cant get all skill")}
        return successResponse(res,data)
    } catch (error) {
        return errorResponse(res,error)
    }
}


export  const getSkillById = async(req,res)=>{
    try {
         const skillId = req.params.skillId
        
         if(!skillId){ return validationErrorResponse(res,"SkillId is needed")}

         const data = await getSkillByIdService(skillId)
        if(!data){throw new Error("Couldn't get skill")}
         return successResponse(res,data)

    } catch (error) {
        return errorResponse(res,error)
    }
}

export const deleteSkill = async(req,res)=>{
        try {
            const id = req.params.skillId
         
            if(!id) { validationErrorResponse(res,"Id is required")}
            const data = await deleteSkillService(id);
    
            if(!data){throw new Error("Couldn't delete data")}
            return successResponse(res,data,"success delete")        
        } catch (error) {
            console.log(error)
            return errorResponse(res,error)
        }
}
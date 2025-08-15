import { JSON } from "sequelize";
import {  approveKycService, deleteKycService, getAllKycService, getKycByIdService, getKycByUserService, registerKycService, requestUpdateKycService } from "../services/kycService.js";
import { generateFilenamesFromFiles } from "../utils/generate.js";
import { errorResponse, successResponse, validationErrorResponse } from "../utils/handleResponse.js";




export const createKyc = async (req,res)=>{
    try {
        const userId = req.user.id;
        const data = req.body;
        const files = req.files

        if(!files){return validationErrorResponse(res,'Images required')}
         const {skillImages,identityImages} = generateFilenamesFromFiles(req.files)

         data.skillImage = skillImages
         data.identityImage = identityImages
         

        if( !data.skills || !data.rate ){
            return validationErrorResponse(res,"Rate and skills array is needed")
        }
     
        if( !Array.isArray(data.skills)){
            data.skills = JSON.parse(data.skills)
        }

        if (!data.experience || !data.serviceArea || !data.identityImage || !data.skillImage) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // const kycData = await registerKyc(data, userId);
        const kycData = await registerKycService(data,userId);
        
        return res.status(201).json({ message: "KYC registered successfully", kycData });

    } catch (error) {
        console.error("Error registering KYC:", error);
        return res.status(500).json({ message: "Failed to register KYC", error: error.message });
    }
}



export const getKycById = async(req,res)=>{

    const id = req.params.kycId

    

    if(!id){return validationErrorResponse(res,"Id is required")}

    const result =await getKycByIdService(id)
    return res.send(result)
 

    return successResponse(res,result,fetchSuccesFul)

}


export const requestUpdateKyc= async(req,res)=>{

     try {
        const userId = req.user.id;
        const data = req.body;
        const files = req.files

        if(!files){return validationErrorResponse(res,'Images required')}
         const {identityImages,skillImages}= generateFilenamesFromFiles(req.files)


         data.skillImage = skillImages
         data.identityImage = identityImages
         
        
        
        if( !data.skills || !data.rate ){
            return validationErrorResponse(res,"skills and Rate array is needed")
        }
     
        if( !Array.isArray(data.skills)){
            data.skills = JSON.parse(data.skills)
        }



        

        if (!data.experience || !data.serviceArea || !data.identityImage || !data.skillImage) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const  result =  await requestUpdateKycService(data,userId)

        return successResponse(res,result)

     } catch (error) {
        return errorResponse(res,error)
     }

}



export const approveKyc= async (req,res)=>{

try {
    
  const id =   req.params.kycId

  if(!id){return validationErrorResponse(req,"Id of kyc is required")}

  const result =  await approveKycService(id)

  successResponse(res,result)
} catch (error) {
    errorResponse(res,error)
}

}


export const getKycByUser = async (req,res)=>{

    try {
      
        const userId = req.user.id
       
        if(!userId){return validationErrorResponse(res,"User id required")}
       
        const result = await getKycByUserService(userId)

        return successResponse(res,result)

    } catch (error) {
        return errorResponse(res,error)
    }
}


export const getAllKyc = async(req,res)=>{

    try {
        const result = await getAllKycService()

        return successResponse(res,result)
    } catch (error) {
       return errorResponse(res,error)
    }
}


export const deleteKyc = async (req,res)=>{
    try {
        const kycId = req.params.kycId
        if(!kycId){return validationErrorResponse(res,"Kyc id needed")}
        const result = await deleteKycService(kycId)
        return successResponse(res,result)
    } catch (error) {
        return  errorResponse(res,err)
    }
}
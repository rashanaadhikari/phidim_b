import { createBookingService, getAllBookingByUserService, getAllBookingByWorkerService } from "../services/bookingService.js"
import { errorResponse, successResponse, validationErrorResponse } from "../utils/handleResponse.js"

export const createBooking = async(req,res)=>{

    try {
        const userId = req.user.id
        const workerId = req.params.workerId
        const data = req.body
        const file = req.file
        const image = file.filename
        data.image = image
        if(!userId || !workerId){
          return validationErrorResponse(res,"User's Id and worker's Id required")
        }
        if( !data.image){
            return validationErrorResponse(res,"Image is required")
        }
        if(!data.location|| !data.description || !data.contact || !data.proposedPrice){
            return  validationErrorResponse(res,"Fields missing")
        }
        const result = await createBookingService(data,userId,workerId)
        
        return successResponse(res,result)

    } catch (error) {
        return errorResponse(res,error)
    }

}


export const getAllBookingByWorker= async (req,res)=>{
    try {
        const workerId = req.user.id
        if(!workerId){return validationErrorResponse(res,"worker Id needed")}
        const result = await getAllBookingByWorkerService(workerId)
        return successResponse(res,result)
    } catch (error) {
        return errorResponse(res,error)
    }
}


export const getAllBookingByUser = async (req,res)=>{
    try {
        const userId = req.user.id
        if(!userId){return validationErrorResponse(res,"UserId needed")}
        const result = await getAllBookingByUserService(userId)
        return successResponse(res,result)
    } catch (error) {
        return errorResponse(res,error)
    }
}



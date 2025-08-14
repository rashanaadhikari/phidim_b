import { registerKyc } from "../services/kycService.js";
import { validationErrorResponse } from "../utils/handleResponse.js";




export const createKyc = async (req,res)=>{
    try {
        const userId = req.user.id;
        const data = req.body;

        if( !data.skills || !Array.isArray(data.skills)){
            return validationErrorResponse(res,"skills array is needed")
        }

        if (!data.experience || !data.serviceArea || !data.identityImage || !data.skillImage) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // const kycData = await registerKyc(data, userId);
        const kycData = await registerKyc(data);
        
        return res.status(201).json({ message: "KYC registered successfully", kycData });

    } catch (error) {
        console.error("Error registering KYC:", error);
        return res.status(500).json({ message: "Failed to register KYC", error: error.message });
    }
}
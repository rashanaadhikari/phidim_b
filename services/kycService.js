import { Kyc, User } from "../models/index.js";


export const registerKyc = async (data,userId ) => {
  
    
        const userFound = await User.findOne({
            where : {id :userId},
            isKycVerified: false
        });
       
        if(!userFound) {
            throw new Error( "User not found or KYC already verified" );
        }

        const kycExists = await Kyc.findOne({
            where: { userId: userId }
        });
        if (kycExists) {
            throw new Error("KYC already exists for this user");
        }
        const kyc = await Kyc.create({
            userId: userId,
            experience : data.experience,
            serviceArea : data.serviceArea,
            identityImage: data.identityImage || [],
            skillImage: data.skillImage || [],
            status: 'pending',
        
        });

        //kyc.addSkill(['plumbing','electrician','hero'])  // Assuming skills is an array of skill IDs

        if(Array.isArray(data.skills) && data.skills.length > 0) {
            await kyc.setSkills(data.skills);
        }


        if (!kyc) {
            throw new Error("Failed to create KYC record");
        }

        return  kyc;
        

        // const updatedUser = await User.update(
        //     { isKycVerified: true,rate:data.rate},
        //     { where: { id: userId } }
        // );

        // if (!updatedUser) {
        //     throw new Error("Failed to update user KYC status");
        // }

        // Here you would typically save the KYC data to the database
        // For demonstration, we'll just return the received data
        // return 

   
}
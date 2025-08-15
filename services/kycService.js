import { where } from "sequelize";
import { Kyc, Skill, User } from "../models/index.js";


export const registerKycService = async (data, userId) => {

    data.userId = userId

    const userFound = await User.findOne({
        where: { id: userId },
        isKycVerified: false
    });

    if (!userFound) {
        throw new Error("User not found or KYC already verified");
    }
    const kycExists = await Kyc.findOne({
        where: { userId: userId }
    });
    if (kycExists) {
        throw new Error("KYC already exists for this user");
    }
    const kyc = await Kyc.create({
        userId: userId,
        editedData: data

    });

    if (!kyc) {
        throw new Error("Failed to create KYC record");
    }

    return kyc;

}



export const getKycByIdService = async (id) => {
    // HEllo Here

    const result = await Kyc.findByPk(id, {
        include: [
            { model: User, attributes: { exclude: ['password'] } },
            { model: Skill }
        ]
    })
    if (!result) { throw new Error("Kyc Not Found with that id") }
    return result

}


export const requestUpdateKycService = async (data, userId) => {

    const kycExists = await Kyc.findOne({
        where: { userId }
    })

    data.userId = userId

    if (!kycExists) { throw new Error("Kyc doesn't exists") }

    const updatedEdited = kycExists.update({ editedData: data })

     await  User.update({isKycEditApproved:false},{where:{id:userId}})

    return updatedEdited

}


export const approveKycService = async (id) => {



    const kycExists = await Kyc.findByPk(id)

    if (!kycExists) { throw new Error("Kyc doesnt exists") }
    const edited = kycExists.editedData

    const editedData = JSON.parse(edited)
    // return editedData

    const kyc = await kycExists.update({
        experience: editedData.experience,
        serviceArea: editedData.serviceArea,
        identityImage: editedData.identityImage || [],
        skillImage: editedData.skillImage || [],
        status: 'approved',
        editedData: null

    });

    await User.update(
        { role : "worker",isKycEditApproved:true, isKycVerified: true, rate: editedData.rate },
        { where: { id: editedData.userId } }
    );

    if (Array.isArray(editedData.skills) && editedData.skills.length > 0) {

        await kyc.setSkills(editedData.skills);
    }

    return kyc

}



export const getKycByUserService = async (userId) => {
    // HEllo Here

    const result = await Kyc.findOne({
        where: { userId },
        include: [
            { model: User, attributes: { exclude: ['password'] } },
            { model: Skill, through: { attributes: [] } } 
        ]
    });

    console.log(result.toJSON());

    return result

}

export const getAllKycService = async () => {

    const result = await Kyc.findAll({
        include: [
            { model: User, attributes: { exclude: ['password'] } },
            { model: Skill }
        ]
    })
}



export const deleteKycService = async (kycId) => {

    const result = await Kyc.destroy({ where: { id: kycId } })

    return result
}


import { col, Op, where } from "sequelize";
import {Otp, ResetOtp, User} from "../models/index.js";
import { comparePassword, generateAccessToken, generateOtp, hashPassword } from "../utils/generate.js";
import sendMail from "../utils/sendMail.js";
import { userResponsePayload } from "../helpers/userPayload.js";


export const authService =async (data)=>{
    
    const filter = {}

    const condition = []

    if(data.email) condition.push({email: data.email});
    if(data.phone) condition.push({phone: data.phone});

    if(condition.length > 0) filter.where = {[Op.or] : condition}

    const existingUser = await User.findOne(filter)

    
    if(existingUser){
        throw new Error("User already exists with this email or phone");
       
    }

    const otpExists = await Otp.findOne({where:{email:data.email}})
   
    if(otpExists && otpExists.expiresAt > new Date()){
        throw new Error("OTP already exists for this ,try after some time");
    }
    if(otpExists && otpExists.expiresAt < new Date()){
        await otpExists.destroy();
    }

    const otp = generateOtp();
    const hashedPassword = hashPassword(data.password);
    data.password = hashedPassword;



   
    const otpCreated =  await Otp.create({
        email: data.email,
        otp,
        tempData: JSON.stringify(data)
    });
    
    
    return "OTP sent to your email successfully";
    await sendMail('ourworld898@gmail.com', otp);

}



export const verifyOtpService = async (otp, email) => {
    const otpExist = await Otp.findOne({
        where:{
            email : email,
            otp: otp
        }
    })
 if (!otpExist) {
        throw new Error("Invalid OTP or email");
    }
    
     if (otpExist.dataValues.expiresAt < new Date()) {
        throw new Error("OTP has expired");
    }
   
    // console.log(otpExist.dataValues.tempData)
    let data = JSON.parse(otpExist.dataValues.tempData);


    if(typeof data === 'string'){
        data = JSON.parse(data);
    }
    
    

    const result=await User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        address: data.address,
        phone: data.phone,
        role: 'customer',
    });
    
   
    
    await otpExist.destroy();
    return result.dataValues;
   
}


export const loginService = async({email,password})=>{

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if(!user){
        throw new Error("User not found");
    }

    const isPasswordValid = user.password && comparePassword(password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid password");
    }

   const payload =  userResponsePayload(user)
   const accessToken = generateAccessToken(payload);
   const refreshToken = generateAccessToken(payload);

    return {
        user: payload,
        accessToken,
        refreshToken
    };

}



export const forgotPasswordService = async ({email})=>{
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if(!user){
        throw new Error("User not found");
    }
    const otp = generateOtp();
    const otpExists = await ResetOtp.findOne({where:{email:email}});
    if(otpExists && otpExists.expiresAt > new Date()){
        throw new Error("OTP already exists for this email, try after some time");
    }
    if(otpExists && otpExists.expiresAt < new Date()){
        await otpExists.destroy();
    }
    const otpCreated = await ResetOtp.create({
        email: email,
        otp: otp
    });
    return "OTP sent to your email successfully";
    await sendMail(email, otp);

}



export const  verifyResetOtpService = async (otp, email) => {
    const otpExist = await ResetOtp.findOne({
        where: {
            email: email,
            otp: otp
        }
    });

    if (!otpExist) {
        throw new Error("Invalid OTP or email");
    }

    if (otpExist.expiresAt < new Date()) {
        await otpExist.destroy();
        throw new Error("OTP has expired");
    }
    const result = await ResetOtp.update({expiresAt: new Date(Date.now() + 20 * 60 * 1000), isVerified : true}, {
        where: {
            email: email,
            otp: otp    
        } 
    });

    return "OTP verified successfully,you can reset your password now";
}


export const resetPasswordService = async ({email, newPassword,otp}) => {

    const otpRecord = await ResetOtp.findOne({
        where: {
            email: email,
            otp: otp,
            isVerified: true
        }
    });

    if (!otpRecord) {
        throw new Error("Invalid OTP ");
    }

    if (otpRecord.expiresAt < new Date()) {
        await otpRecord.destroy();
        throw new Error("OTP has expired");
    }

    const hashedPassword = hashPassword(newPassword);
    await User.update({ password: hashedPassword }, {
        where: {
            email: email
        }
    });
    await otpRecord.destroy();
    return "Password reset successfully";

}



import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../helpers/constants.js";

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

export const generateAccessToken = (user) => {

const token = jwt.sign(user,env.JWT_ACCESS_SECRET , { expiresIn: env.JWT_ACCESS_EXPIRES_IN });
  return token;
}

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export const generateRefreshToken = (user) => {
  const token = jwt.sign(user, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });
  return token;
}


export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
}


export const  generateFilenamesFromFiles = (files)=>{


const fieldnames = Object.keys(files)



  const imageArrays = fieldnames.map((fieldname)=>{
      return files[fieldname]
  })


  const filenames =   imageArrays.map((imageArray)=>{
            return  (imageArray.map((image)=>{
               return image.filename
            }))
         
    })
    
    
    const pairs = fieldnames.map((fieldname,index)=>{
        return [fieldname,filenames[index]]
    })
    
    return Object.fromEntries(pairs)
    
    

}




    
    
        
    
    



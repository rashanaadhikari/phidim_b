import jwt from "jsonwebtoken";
import { env } from "./helpers/constants.js";
const createJwtToken = (user) => {

const token = jwt.sign(user,env.JWT_SECRET , { algorithm: 'HS256',expiresIn: env.JWT_EXPIRES_IN });
  return token;
}

console.log(createJwtToken({ id: 1, email: "email"}))
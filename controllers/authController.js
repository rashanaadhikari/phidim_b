import e from "express";
import { userCreatePayload, userResponsePayload } from "../helpers/userPayload.js";
import { isValidEmail, isValidPassword } from "../helpers/validator.js";
import { authService, forgotPasswordService, loginService, resetPasswordService, verifyOtpService, verifyResetOtpService } from "../services/authService.js";
import { errorResponse, successResponse, validationErrorResponse } from "../utils/handleResponse.js";
import { env } from "../helpers/constants.js";


export const register = async (req, res) => {

    try {
        const user = req.body || {};

        if (!user.fullName || !user.password || !user.address) {

            return validationErrorResponse(res, "Full name, password, and address are required.");
        }
        if (!user.email && !user.phone) {
            return validationErrorResponse(res, "Email or phone is required.");
        }

        if (user.email) {
            if (!isValidEmail(user.email)) {
                return validationErrorResponse(res, "Invalid email format.");
            }
        }

        if (!isValidPassword(user.password)) {
            return validationErrorResponse(res, "Password must be at least 6 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char");
        }

        const createPayload = userCreatePayload(user)

        const result = await authService(createPayload);

        if (result) {

            return successResponse(res, result, "Otp sent to your email successfully");
        }


    } catch (error) {
        console.log(error.message);
        return errorResponse(res, error, "Registration failed");
    }
}



export const verifyOtp = async (req, res) => {

    try {

        const { otp, email } = req.body;
        if (!otp || !email) {
            return validationErrorResponse(res, "OTP and email are required.");
        }
        const result = await verifyOtpService(otp, email)

        if (!result || Object.keys(result).length == 0) { return errorResponse(res, "Registration failed", "User creation failed"); }

        const payload = userResponsePayload(result);


        return successResponse(res, payload, "User registered successfully");
    } catch (error) {
        console.log(error.message);
        errorResponse(res, error, "OTP verification failed");
    }
}


export const login = async (req, res) => {
    try {


        const { email, password } = req.body

        if (!email || !password) {
            return validationErrorResponse(res, "Credentials missing")
        }

        const result = await loginService({ email, password })

        const { refreshToken, accessToken, user } = result



        if (!refreshToken || !accessToken || !user) {
            throw new Error("Failed to login")
        }

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/"
        });



        return successResponse(res, { accessToken, user })



    } catch (error) {
        console.log(error.message)
        errorResponse(res, error, "Something went wrong wile logging i...")
    }
}


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return validationErrorResponse(res, "Email is required.");
        }

        if (!isValidEmail(email)) {
            return validationErrorResponse(res, "Invalid email format.");
        }

        const result = await forgotPasswordService({ email });
        if (!result) {
            return errorResponse(res, "Failed to send OTP for password reset.");
        }

        return successResponse(res, null, "OTP sent to your email for password reset.");
    } catch (error) {
        console.log(error.message);
        return errorResponse(res, error, "Failed to send OTP for password reset.");
    }
}


export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return validationErrorResponse(res, "Email, OTP are required.");
        }

        if (!isValidEmail(email)) {
            return validationErrorResponse(res, "Invalid email format.");
        }


        const result = await verifyResetOtpService(otp, email);

        if (!result) {
            return errorResponse(res, "Failed to verify OTP.");
        }

        return successResponse(res, null, "Otp verified successfully, you can reset your password now.");
    } catch (error) {
        console.log(error.message);
        return errorResponse(res, error, "Failed to reset password.");
    }
}


export const resetPassword = async (req, res) => {

    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !newPassword || !otp) {
            return validationErrorResponse(res, "Email and new password are required.");
        }

        if (!isValidEmail(email)) {
            return validationErrorResponse(res, "Invalid email format.");
        }

        if (!isValidPassword(newPassword)) {
            return validationErrorResponse(res, "Password must be at least 6 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char");
        }

        // Logic to reset the password goes here

        // For example, find the user by email and update the password
        const result = await resetPasswordService({ email, otp, newPassword });
        return successResponse(res, null, "Password reset successfully.");
    } catch (error) {
        console.log(error.message);
        return errorResponse(res, error, "Failed to reset password.");
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken',{
            httpOnly : true,
            secure: env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/"
        });
       
        return successResponse(res, null, "Logged out successfully.");
    } catch (error) {
        console.log(error.message);
        return errorResponse(res, error, "Failed to log out.");
    }
}
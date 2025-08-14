import nodemailer from "nodemailer";
import {env} from "../helpers/constants.js";
import e from "express";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: env.PLATFORM_EMAIL ,
    pass: env.PLATFORM_PASSWORD 
  },
});

const platformEmail = env.PLATFORM_EMAIL || "phidimservice@gmail.com";

const sendMail = async (to, otp) => {
  // Parts
  const header = `
    <div style="background-color: #4CAF50; color: white; text-align: center; padding: 20px;">
      <h1 style="margin: 0;">Phidim Service</h1>
    </div>
  `;

  const otpSection = `
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 28px; font-weight: bold; color: #4CAF50; letter-spacing: 4px; display: inline-block; background: #f4f4f4; padding: 12px 24px; border-radius: 6px; border: 1px solid #4CAF50;">
        ${otp}
      </span>
    </div>
  `;

  const footer = `
    <div style="background-color: #f4f4f4; color: #777; text-align: center; padding: 15px; font-size: 12px;">
      &copy; ${new Date().getFullYear()} Phidim Service. All rights reserved.
    </div>
  `;

  // Fixed text message instead of undefined `text`
  const bodyText = `
    <p style="font-size: 16px;">Please use the following One-Time Password (OTP) to verify your email address.</p>
  `;

  // Combine in htmlContent
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 8px rgba(0,0,0,0.1);">
        ${header}
        <div style="padding: 30px; color: #333333;">
          <h2 style="color: #4CAF50;">Email Verification</h2>
          <p style="font-size: 16px;">Hello,</p>
          ${bodyText}
          ${otpSection}
          <p style="font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
        </div>
        ${footer}
      </div>
    </div>
  `;

  // Send Email
  const info = await transporter.sendMail({
    from: `"Phidim Service" <${platformEmail}>`,
    to: to,
    subject: "Verify your email",
    html: htmlContent,
  });

};


export default sendMail;

// app/api/sendEmail.js

import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    const data = {
      to: email,
      subject: "reset password (Truck-Mate)",
      text: "Thanks for registering truck-mate and enjoy your trips",
      html: ` <div style="background-color: #f7fafc; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center;">
        <img
          src="https://truck-mate.vercel.app/_next/image?url=%2Flogopng.png&w=64&q=75"
          alt="Truck-Mate Logo"
          style="display: block; margin: auto; height: 64px; margin-bottom: 16px;"
        />
        <h1 style="font-size: 24px; font-weight: bold; color: #3b82f6;">Welcome back to Truck-Mate!</h1>
        <p style="margin-top: 8px; font-size: 18px; color: #4a5568;">This is your otp enter this opt in the otp fields to reset the password</p>
      </div>
      <div style="margin-top: 24px; text-align: center;">
        <p style="font-size: 20px; color: #1a202c; font-weight: 600;">Your OTP Code:</p>
        <div style="margin-top: 8px; display: inline-block; background-color: #fbbf24; color: #b45309; font-weight: bold; padding: 8px 16px; border-radius: 4px; font-size: 24px; letter-spacing: 0.1em;">
          ${otp}
        </div>
      </div>
      <div style="margin-top: 24px; text-align: center;">
        <p style="color: #4a5568;">Click the link below to get started:</p>
        <a
          href="https://truck-mate.vercel.app/"
          style="margin-top: 8px; display: inline-block; background-color: #3b82f6; color: white; font-weight: 600; padding: 8px 16px; border-radius: 4px; text-decoration: none;"
        >
          Visit Truck-Mate
        </a>
      </div>
      <div style="margin-top: 24px; text-align: center; color: #718096; font-size: 14px;">
        <p>If you have any questions, feel free to contact us at support@truck-mate.com.</p>
        <p style="margin-top: 8px;">&copy; 2024 Truck-Mate. All rights reserved.</p>
      </div>
    </div>`,
    };
    const { to, subject, text, html } = data;

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail' or any other email service
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app-specific password
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending email" }), {
      status: 500,
    });
  }
}

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import mongo from "@/utils/db";
import nodemailer from "nodemailer";
export async function POST(request) {
  const { name, email, password, userType } = await request.json();
  console.log(name, email, password, userType);

  const data = {
    to: email,
    subject: "welcome to truck-mate",
    text: "Thanks for registering truck-mate and enjoy your trips",
    html: ` <div style="background-color: #f7fafc; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center;">
      <img
        src="https://truck-mate.vercel.app/_next/image?url=%2Flogopng.png&w=64&q=75"
        alt="Truck-Mate Logo"
        style="display: block; margin: auto; height: 64px; margin-bottom: 16px;"
      />
      <h1 style="font-size: 24px; font-weight: bold; color: #3b82f6;">Welcome to Truck-Mate, ${name}!</h1>
      <p style="margin-top: 8px; font-size: 18px; color: #4a5568;">We are excited to have you on board. your truck mate account is created as ${userType}</p>
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
  // Validate mandatory fields
  if (!name || !email || !password || !userType) {
    return new NextResponse(
      JSON.stringify({ error: "Mandatory fields are missing" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const db = await mongo();
    const usersCollection = db.collection("users");

    // Check if email already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "Email already exists" }),
        {
          status: 409,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Insert the new user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      userType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'gmail' or any other email service
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return new NextResponse(
      JSON.stringify({ message: "User has been created", info }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

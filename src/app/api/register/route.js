import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import mongo from "@/utils/db";

export async function POST(request) {
  const { name, email, password, userType } = await request.json();
  console.log(name, email, password, userType);

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

    return new NextResponse(
      JSON.stringify({ message: "User has been created" }),
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

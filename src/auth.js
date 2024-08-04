import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import mongo from "./utils/db";
import nodemailer from "nodemailer";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const db = await mongo();
          const usersCollection = await db.collection("users");
          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          console.log(credentials, user, "checking user");
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            console.log(isMatch, "checking password");

            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile) {
        const db = await mongo();
        const usersCollection = await db.collection("users");
        console.log(profile, "checking profile");
        // Check if the user exists in your database
        const existingUser = await usersCollection.findOne({
          email: profile.email,
        });

        // If the user does not exist, create a new user
        if (!existingUser) {
          const hashedPassword = await bcrypt.hash("default-password", 10); // Change "default-password" as needed
          await usersCollection.insertOne({
            name: profile.name,
            email: profile.email,
            image: profile.picture || profile.avatar_url || "",
            password: hashedPassword, // Store a hashed password
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          const data = {
            to: profile.email,
            subject: "welcome to truck-mate",
            text: "Thanks for registering truck-mate and enjoy your trips",
            html: ` <div style="background-color: #f7fafc; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center;">
              <img
                src="https://truck-mate.vercel.app/_next/image?url=%2Flogopng.png&w=64&q=75"
                alt="Truck-Mate Logo"
                style="display: block; margin: auto; height: 64px; margin-bottom: 16px;"
              />
              <h1 style="font-size: 24px; font-weight: bold; color: #3b82f6;">Welcome to Truck-Mate, ${profile.name}!</h1>
              <p style="margin-top: 8px; font-size: 18px; color: #4a5568;">We are excited to have you on board.</p>
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
        }
      }

      return true; // Allow sign-in
    },
  },
  trustHost: true,
});

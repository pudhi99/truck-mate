import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import mongo from "./utils/db";

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
            image: profile.picture,
            password: hashedPassword, // Store a hashed password
          });
        }
      }

      return true; // Allow sign-in
    },
  },
  trustHost: true,
});

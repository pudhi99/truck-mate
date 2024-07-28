import { auth } from "@/auth";
import Profile from "@/components/user/Profile";
import mongo from "@/utils/db";
import React from "react";

const page = async () => {
  let user = null; // Initialize user as null
  try {
    const db = await mongo();
    const usersCollection = db.collection("users");
    const session = await auth();
    const userEmail = session?.user?.email;

    if (userEmail) {
      user = await usersCollection.findOne({ email: userEmail });
    }

    if (user) {
      user._id = user._id.toString(); // Convert ObjectId to string if user exists
      console.log(user);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <Profile userData={user} />
    </div>
  );
};

export default page;

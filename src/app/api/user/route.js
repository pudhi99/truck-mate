import { auth } from "@/auth";
import mongo from "@/utils/db";

export async function GET(req) {
  try {
    const db = await mongo();
    const usersCollection = db.collection("users");
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: "User authentication not found" }),
        {
          status: 401, // Unauthorized
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find the user by email
    const user = await usersCollection.findOne({ email: userEmail });
    console.log(user, "checking user data");
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404, // Not Found
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the user data
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error fetching user data:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch user data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(req) {
  // Parse the request body
  const updateData = await req.json();
  console.log(updateData); // Log the entire update data

  // Input validation (basic example)
  // if (!updateData.phoneNumber || !updateData.name || !updateData.age || !updateData.driverType) {
  //   return new Response(JSON.stringify({ error: "Missing required fields" }), {
  //     status: 400,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }

  try {
    const db = await mongo();
    const usersCollection = db.collection("users");
    const session = await auth();
    const userEmail = session?.user?.email || updateData.email;

    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: "User authentication not found" }),
        {
          status: 401, // Unauthorized
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: userEmail }, // Ensure _id is correct
      {
        $set: updateData, // Use the entire updateData object
      },
      { returnDocument: "after" }
    );

    console.log(updatedUser, "updatedUser");

    // Check if the user was found and updated
    if (!updatedUser.email) {
      return new Response(
        JSON.stringify({ error: "User not found or no changes made" }),
        {
          status: 404, // Not Found
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update profile",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

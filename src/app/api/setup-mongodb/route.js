// pages/api/setup-mongodb.js

import mongo from "@/utils/db";

export const setupMongoDB = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = mongo();

    // Check if the collections exist, and create them if they don't
    await createCollectionIfNotExists(db, "users", {
      phoneNumber: "string",
      name: "string",
      age: "number",
      userType: "string",
      profile: {
        ownerCumDriver: "boolean",
        driverOnly: "boolean",
        rating: "number",
        profileViews: "number",
        likes: "number",
        completedJobs: "number",
        status: "string",
      },
      aadhaarVerified: "boolean",
      panVerified: "boolean",
      createdAt: "date",
      updatedAt: "date",
    });

    await createCollectionIfNotExists(db, "trucks", {
      userId: "objectId",
      vehicleType: "string",
      capacity: "number",
      image: "string",
      tires: "string",
      length: "number",
      bodyType: "string",
      company: "string",
      rcDocument: "string",
      createdAt: "date",
      updatedAt: "date",
    });

    await createCollectionIfNotExists(db, "loads", {
      userId: "objectId",
      loadType: "string",
      loadSize: "string",
      origin: "string",
      destination: "string",
      distance: "number",
      price: "number",
      vehicleType: "string",
      vehicleCapacity: "number",
      vehicleLength: "number",
      vehicleTires: "string",
      company: "string",
      dateTime: "date",
      image: "string",
      status: "string",
      createdAt: "date",
      updatedAt: "date",
    });

    await createCollectionIfNotExists(db, "bids", {
      loadId: "objectId",
      driverId: "objectId",
      bidAmount: "number",
      bidAmountPerTon: "number",
      status: "string",
      createdAt: "date",
      updatedAt: "date",
    });

    await createCollectionIfNotExists(db, "jobStatus", {
      bidId: "objectId",
      status: "string",
      timestamp: "date",
      createdAt: "date",
      updatedAt: "date",
    });

    // Insert some initial dummy data
    await db.collection("users").insertMany([
      {
        phoneNumber: "1234567890",
        name: "John Doe",
        age: 30,
        userType: "driver",
        profile: {
          ownerCumDriver: true,
          driverOnly: true,
          rating: 4.5,
          profileViews: 100,
          likes: 20,
          completedJobs: 50,
          status: "free",
        },
        aadhaarVerified: true,
        panVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phoneNumber: "9876543210",
        name: "Jane Smith",
        age: 25,
        userType: "contractor",
        profile: {
          ownerCumDriver: false,
          driverOnly: false,
          rating: 4.2,
          profileViews: 50,
          likes: 10,
          completedJobs: 20,
          status: "free",
        },
        aadhaarVerified: true,
        panVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await db.collection("trucks").insertMany([
      {
        userId: "1234567890",
        vehicleType: "Truck A",
        capacity: 10,
        image: "truck-a.jpg",
        tires: "Michelin",
        length: 20,
        bodyType: "Flatbed",
        company: "ABC Transport",
        rcDocument: "RC1234567890",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "9876543210",
        vehicleType: "Truck B",
        capacity: 15,
        image: "truck-b.jpg",
        tires: "Goodyear",
        length: 25,
        bodyType: "Box",
        company: "XYZ Logistics",
        rcDocument: "RC9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await db.collection("loads").insertMany([
      {
        userId: "1234567890",
        loadType: "Furniture",
        loadSize: "Large",
        origin: "New York",
        destination: "Los Angeles",
        distance: 3000,
        price: 1000,
        vehicleType: "Truck A",
        vehicleCapacity: 10,
        vehicleLength: 20,
        vehicleTires: "Michelin",
        company: "ABC Transport",
        dateTime: new Date(),
        image: "load-1.jpg",
        status: "live",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "9876543210",
        loadType: "Electronics",
        loadSize: "Medium",
        origin: "Chicago",
        destination: "San Francisco",
        distance: 2000,
        price: 800,
        vehicleType: "Truck B",
        vehicleCapacity: 15,
        vehicleLength: 25,
        vehicleTires: "Goodyear",
        company: "XYZ Logistics",
        dateTime: new Date(),
        image: "load-2.jpg",
        status: "hold",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await db.collection("bids").insertMany([
      {
        loadId: "1234567890",
        driverId: "1234567890",
        bidAmount: 900,
        bidAmountPerTon: 90,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        loadId: "9876543210",
        driverId: "9876543210",
        bidAmount: 700,
        bidAmountPerTon: 70,
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await db.collection("jobStatus").insertMany([
      {
        bidId: "1234567890",
        status: "reached origin",
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        bidId: "9876543210",
        status: "loading completed",
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await client.close();
    res.status(200).json({ message: "MongoDB setup successful" });
  } catch (error) {
    console.error("Error setting up MongoDB:", error);
    res.status(500).json({ message: "Error setting up MongoDB" });
  }
};

async function createCollectionIfNotExists(db, collectionName, schema) {
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((c) => c.name === collectionName);

  if (!collectionExists) {
    await db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: Object.keys(schema),
          properties: Object.fromEntries(
            Object.entries(schema).map(([key, type]) => [
              key,
              { bsonType: getMongoDBType(type) },
            ])
          ),
        },
      },
    });
    console.log(`Collection '${collectionName}' created successfully.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

function getMongoDBType(type) {
  switch (type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "bool";
    case "date":
      return "date";
    case "objectId":
      return "objectId";
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

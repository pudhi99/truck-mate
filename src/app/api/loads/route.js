import mongo from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await mongo();
    const loads = await db.collection("loads").find({}).toArray();

    if (loads.length === 0) {
      return NextResponse.json({ message: "Empty" }, { status: 200 });
    }

    return NextResponse.json(loads, { status: 200 });
  } catch (error) {
    console.error("Error fetching loads:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = await mongo();
    // const loadsCollection = db.collection("loads");
    const collections = await db.listCollections().toArray();
    const checkingLoadsCollection = collections.find((c) => c.name === "loads");

    if (!checkingLoadsCollection) {
      await db.createCollection("loads");
      console.log("loads collection created");
    }

    const loadsCollection = db.collection("loads");

    const {
      origin,
      destination,
      materialName,
      quantity,
      bodyType,
      truckType,
      tyres,
      advance,
      price,
      includeLUC,
      LUcharges,
      date,
      remarks,
      distance,
    } = await request.json();

    const result = await loadsCollection.insertOne({
      origin: origin || "",
      destination: destination || "",
      distance: distance || 0,
      materialName: materialName || "",
      quantity: typeof quantity === "number" ? quantity : 0,
      bodyType: bodyType || "",
      truckType: truckType || "",
      tyres: typeof tyres === "number" ? tyres : 0,
      advance: typeof advance === "number" ? advance : 0,
      price: typeof price === "number" ? price : 0,
      includeLUC: typeof includeLUC === "boolean" ? includeLUC : false,
      LUcharges: typeof LUcharges === "number" ? LUcharges : 0,
      date: date ? new Date(date) : null,
      remarks: remarks || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new NextResponse(
      JSON.stringify({ message: "User has been created", result: result }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching loads:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

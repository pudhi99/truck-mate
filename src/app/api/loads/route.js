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

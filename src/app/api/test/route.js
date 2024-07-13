import mongo from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const db = await mongo();
  const test = await db.collection("test").find({}).toArray();
  return NextResponse.json(test);
}

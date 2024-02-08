import Settings from "@/app/(models)/Settings";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await Settings.findOne();

    return NextResponse.json( settings , { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
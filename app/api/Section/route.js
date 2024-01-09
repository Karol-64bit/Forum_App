import Section from "@/app/(models)/Section";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        console.log(body);
        await Section.create(body.formData);
        return NextResponse.json({message: "OK"},{status: 200});
    } catch (error){
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function GET() {
    try {
      const sections = await Section.find();
  
      return NextResponse.json({ sections }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
  }
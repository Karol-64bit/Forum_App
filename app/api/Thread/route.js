import Thread from "@/app/(models)/Thread";
import Section from "@/app/(models)/Section";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        const sectionId = body.formData.section
        const thread = {
            userId: body.formData.userId,
            userName: body.formData.userName,
            title: body.formData.title,
            question: body.formData.question,
            sectionId: sectionId,
            userAvatarUrl: body.formData.userAvatarUrl,
        }
        // console.log(thread);
        // console.log(sectionId);
        const section = await Section.findById(sectionId);  
        if (section){
            // console.log(thread);
            await Thread.create(thread);
            return NextResponse.json({message: "OK"},{status: 200});
        }else{
            console.log("Thread not found");
            return NextResponse.json({ message: "Cant find section", error }, { status: 500 });
        }



    } catch (error){
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function GET() {
    try {
      const threads = await Thread.find();
  
      return NextResponse.json({ threads }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
  }

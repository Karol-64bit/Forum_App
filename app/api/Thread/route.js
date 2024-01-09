import Thread from "@/app/(models)/Thread";
import Section from "@/app/(models)/Section";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        const sectionId = body.formData.sectionId
        const thread = {
            title: body.formData.title,
            question: body.formData.question,
            userId: body.formData.title,
            UserName: body.formData.title,
            posts:[],

        }
        console.log(body.formData)
        const section = await Section.findById(sectionId);
        
        if (section){
            section.threads.push(thread);
            await section.save();
        }else{
            return NextResponse.json({ message: "Cant find section", error }, { status: 500 });
        }

        

        // const section = await Section.findByIdAndUpdate(
        //     sectionId,
        //     { $push: { threads: thread. }}
        //     );

        console.log(thread);
        await Thread.create(thread);
        return NextResponse.json({message: "OK"},{status: 200});
    } catch (error){
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

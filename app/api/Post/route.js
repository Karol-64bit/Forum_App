import Post from "@/app/(models)/Post";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        await Post.create(body.formData);
        return NextResponse.json({message: "Post został dodany"},{status: 200});
    } catch (error){
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}




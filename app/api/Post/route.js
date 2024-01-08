import Post from "@/app/(models)/Post";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const body = await req.json();
        console.log(body);
        await Post.create(body.formData);
        return NextResponse.json({message: "OK"},{status: 200});
    } catch (error){
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

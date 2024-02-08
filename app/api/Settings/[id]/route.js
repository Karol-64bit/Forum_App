import Settings from "@/app/(models)/Settings";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    try{
        const {id} = params;
        const body = await req.json();
        console.log("Body: ",body)
        const updateInfo = await Settings.findOneAndUpdate(
            { _id: id },
            {
                description: body.description,
                backgroundColor: body.backgroundColor,
                displayDescription: body.displayDescription,
                displayFooter: body.displayFooter,
                element1Color: body.element1Color,
                element2Color: body.element2Color,
                githubProvider: body.githubProvider,
                googleProvider: body.googleProvider,
                navColor: body.navColor,
                title: body.title
              }
        );
        return NextResponse.json({ res: updateInfo}, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: error}, {status: 500});
    }
}
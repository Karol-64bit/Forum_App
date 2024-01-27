import User from '@/app/(models)/User'
import { NextResponse } from 'next/server'

export async function GET(req, {params}) {
    try{
        const {id} = params;
        console.log(id);
        const userInfo = await User.findOne({_id: id});
        // console.log(userInfo);
        return NextResponse.json({ userInfo },{status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}

export async function PUT(req, {params}) {
    try{
        const {id} = params;
        const body = await req.json();
        console.log("test",body.avatarUrl)
        const test = body.avatarUrl;
        console.log("id", id);
        const userInfo = await User.findOneAndUpdate(
          { _id: id },
          {
            email: body.email,
            name: body.name,
            role: body.role,
            avatarUrl: body.avatarUrl,
          }
        );
            console.log("user info -> ",userInfo)
        return NextResponse.json({ res: userInfo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}

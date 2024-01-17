import Thread from '@/app/(models)/Thread'
import { NextResponse } from 'next/server'

export async function GET(req, {params}) {
    try{
        const {id} = params;
        console.log(id);
        const threadInfo = await Thread.findOne({_id: id});
        console.log(threadInfo);
        return NextResponse.json({ threadInfo },{status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}

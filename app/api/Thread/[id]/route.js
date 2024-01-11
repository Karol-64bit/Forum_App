import Thread from '@/app/(models)/Thread'
import { NextResponse } from 'next/server'

export async function GET(req, {params}) {
    try{
        const {id} = params;
        console.log(id);
        const foundThreads = await Thread.find({sectionId: id});
    
        return NextResponse.json({ foundThreads },{status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}

import Post from '@/app/(models)/Post'
import { NextResponse } from 'next/server'

export async function GET(req, {params}) {
    try{
        const {id} = params;
        console.log(id);
        const foundPosts = await Post.find({threadId: id});
    
        return NextResponse.json({ foundPosts },{status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}

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

export async function PUT(req, {params}) {
    try{
        const {id} = params;
        const body = await req.json();
        console.log("Body: ",body)
        const updateInfo = await Post.findOneAndUpdate(
            { _id: id },
            {
                content:body.content
              }
        );
        return NextResponse.json({ res: updateInfo}, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: error}, {status: 500});
    }
}

export async function DELETE(req, { params }) {
    try {
      const { id } = params;
  
      const postToDelete = await Post.findByIdAndDelete(id);
  
      if (!postToDelete) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {

      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
  

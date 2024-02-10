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

export async function PUT(req, {params}) {
    try{
        const {id} = params;
        const body = await req.json();
        console.log("Body: ",body)
        const updateInfo = await Thread.findOneAndUpdate(
            { _id: id },
            {
                question:body.question,
                title:body.title
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
  
      const threadToDelete = await Thread.findByIdAndDelete(id);
  
      if (!threadToDelete) {
        return NextResponse.json({ message: "Thread not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Thread deleted successfully" }, { status: 200 });
    } catch (error) {

      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
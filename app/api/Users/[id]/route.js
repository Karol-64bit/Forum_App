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
        console.log("Body: ",body)
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
        return NextResponse.json({ res: "Updated"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}

export async function DELETE(req, { params }) {
    try {
      const { id } = params;
  
      const result = await User.findByIdAndDelete(id);
  
      if (!result) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
    }
  }
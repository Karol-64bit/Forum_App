import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    //Confirm data exists
    if (!userData?.email || !userData.password || !userData.name) {
      return NextResponse.json(
        { message: "Wszystkie pola są wymagane." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Podane mail istnieje już w bazie." }, { status: 409 });
    }
    userData.role = "user";
    console.log(userData)
    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;
    console.log(userData);

    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(err);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
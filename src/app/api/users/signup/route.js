import { Connect } from "@/dbConfig/connect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

Connect();

export async function POST(request = NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody,' consoling the reqest body');
    //check user exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json({ error: "user alredy exist" }, { status: 400 });
    }

    //hash the password
    const slat = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, slat);

    //create a user
    const createUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const user = await createUser.save();
    console.log(user);
    return NextResponse.json({
      message: "user created succesfully",
      success:true,
      user
    });
  } catch (err) {
    console.log(' error in the signtup')
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

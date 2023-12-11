import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await NextResponse.json({
      message: "Logout successfull",
      success: true,
    });
    response.cookies.set("token"," ",{httpOnly:true})
    return response
  } catch (error) {
    return NextResponse.json({ message: "Error at Logout" }, { status: 400 });
  }
}

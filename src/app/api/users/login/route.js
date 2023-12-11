import { Connect } from "@/dbConfig/connect";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


Connect()

export async function POST(request = NextRequest){
    try{
        const reqBody = await request.json()
        const {email,password}  = reqBody
        console.log(reqBody)

        //check if user exists
        const existingUser = await User.findOne({email:email})
        if(!existingUser){
            return NextResponse.json({error:"user does not exist"},{status:400})
        }
        //check if password is correct
        const validPassword = await bcryptjs.compare(password,existingUser?.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }
        //create token data
        const tokenData = {
            id : existingUser._id,
            username : existingUser.username
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})
        const response = NextResponse.json({
            message:"Login successfull",
            succes:true,
        })
        response.cookies.set("token",token,{httpOnly:true})
        return response
        // returing the response is the final part and hope this will work 
    }catch(error){
        console.log("error at user login",error)
        return NextResponse.json({error:"error.message"},{status:500})
    }
}
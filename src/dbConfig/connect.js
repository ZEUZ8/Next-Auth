import mongoose from "mongoose"

export async function Connect(){
    try{
        mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB connected successfully")
        })
        connection.on("error",()=>{
            console.log('MongoDB connection erorr. please make sure MongoDB is running')
            process.exit()
        })
    }catch(err){
        console.log(err,' the error in the console')
    }
}
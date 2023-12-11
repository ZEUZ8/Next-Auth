import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Please provide a  Email"]
    },
    password:{
        type:String,
        required:[true,'Please provide a password']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
      type:Boolean,
      default:false  
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry :Date,
})

  
const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User
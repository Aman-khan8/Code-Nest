import bcrypt from "bcrypt"
import { User } from "../models/userModel.js";
import ApiResponse from "../utils/apiResponse.js";
const signUp = async(req,res)=>{
      try {
        
      
    const {fullname,username,email,password}=req.body;

    const alreadyExit=await User.findOne({email});
    if(alreadyExit){
        return res.json(new ApiResponse(400,"Email is already registered"))
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({
        fullname,
        username,
        email,
        password:hashedPassword,
    });
     return res.json(
        new ApiResponse(201,"Signup Successful",newUser)     )
    } catch (error) {
        return res.json(
          new ApiResponse(500,"Signup Failed")
        )
      }    

}

export default signUp;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/userModel.js";


const login= async (res,req)=>{
              try {

    const{email,password}=req.body;

    const user= await User.findOne({email});
    if(!user){
        return res.json(
            new ApiResponse(400,false,"Email is not registered") );
    }

    const isPassCorrect=await bcrypt.compare(password,user.password);
    if(!isPassCorrect){
        return res.json(
            new ApiResponse(400,false,"Invalid Credentials")
        )
    }
    const token =jwt.sign({
        id:user._id
    } ,
    process.env.JWT_Scret,{
        expiresIn:"3d",
    }
    
)

return res.json(
    new ApiResponse(201,true,"Login Successful",user)
)


 } catch (err) {
                
    return res.json(
        new ApiResponse(500,false,"Login Failed")
    )
              }
}

export default login;
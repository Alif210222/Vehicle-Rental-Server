import { Request, Response } from "express";
import { userService } from "./user.service";



const createUser = async(req:Request,res:Response)=>{
    const {name,email,password,role} = req.body;
     const result = await userService.createUser(name,email,password,role);
     
    //  console.log(result);
    try {
        res.status(201).json({
            success: true,
            message:"User created",
            data:result.rows[0]
        })
    } catch (error:any) {
           res.status(500).json({
             success: false,
             message:"User created failed",
           })
           
    }

}


export const userController = {
      createUser
}


import { Request, Response } from "express";
import { userService } from "./user.service";



const createUser = async(req:Request,res:Response)=>{
    // const {name,email,password,phone,role} = req.body;
    
    //  console.log(result);
    try {
          const result = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message:"User registered successfully",
            data:result.rows[0]
        })
    } catch (error:any) {
           res.status(500).json({
             success: false,
             message:"Failed ! Email must be unique and password atlist 6 carecter ! ",
           })        
  }}


  // get all user
const getUser = async(req:Request,res:Response)=>{
    //  console.log(result);
    try {

         const result = await userService.getUser();

        res.status(201).json({
            success: true,
            message:"Users retrieved successfully",
            data:result.rows
        })
    } catch (error:any) {
           res.status(500).json({
             success: false,
             message:error.message,
           })        
  }}

  // get single user
  const getSingleUser = async(req:Request,res:Response)=>{
    //  console.log(result);
    try {

         const result = await userService.getSingleUser(req.params.userId as string);

      if(result.rows.length === 0 ){
            res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        else{
            res.status(200).json({
                success:true,
                message:"User fetched successfully",
                data:result.rows[0],
            })
        }
    } catch (error:any) {
           res.status(500).json({
             success: false,
             message:error.message,
           })        
  }}


  // update user 

  const updateUser = async(req:Request,res:Response)=>{
         const {name,email,password,phone,role} = req.body;
         const targetUserId = req.params.userId;    // user updated 
         const loggedInUser = req.user;  // for getting login user 
    
    //  console.log(result);
    try {   
       if (loggedInUser!.role === "customer" && loggedInUser!.id !== Number(targetUserId)) {
      return res.status(403).json({
        success: false,
        message: "Customers can only update their own profile"
      });
    }

    // Customers cannot update role
    let roleToUpdate = role;
    if (loggedInUser!.role === "customer") {
      roleToUpdate = undefined;
    }

          const result = await userService.updateUser
          ({name,email,password,phone,role: roleToUpdate}, targetUserId!);

        if(result.rows.length === 0){
            return res.status(404).json({
                   success:false,
                    message:"User not found"
            });
          }
           else{
               res.status(200).json({
                   success:true,
                   message:"User updated successfully",
                   data:result.rows[0],
               })
           }
    } catch (error:any) {
       console.error("Update Error:", error); 

           res.status(500).json({
           success: false,
           message: "Update request failed !",
           error: error.message, 
  });      
  }}


   const deleteUser = async(req:Request,res:Response)=>{
    //  console.log(result);
    try {
          const result = await userService.deleteUser(req.params.userId as string );

        if(result.rows.length === 0){
            return res.status(404).json({
                   success:false,
                    message:"User not found"
            });
          }
           else{
               res.status(200).json({
                   success:true,
                   message:"User delete successfully",
                  
               })
           }
    } catch (error:any) {
           res.status(500).json({
             success: false,
             message:error.message,
           })        
  }}





export const userController = {
      createUser,
      getUser,
      getSingleUser,
      updateUser,
      deleteUser
}


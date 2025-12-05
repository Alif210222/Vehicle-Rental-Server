import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const  addVehicle = async(req:Request,res:Response)=>{

       try {
         const result = await vehicleService.addVehicle(req.body);
         res.status(201).json({
            success: true,
            message:"Vehicle created successfully",
            data:result.rows[0]
        
             })
       } catch (error) {
            res.status(500).json({
             success: false,
             message:"Vehicle created failed",
           })        
     
}}


// get all V
   const getAllVehicle =async (req:Request,res:Response) => {

         try {
            const result = await vehicleService.getVehicle()
            
            res.status(200).json({
            success: true,
            message:"Vehicles retrieved successfully",
            data:result.rows
        })
         } catch (error:any) {
             res.status(500).json({
             success: false,
             message:error.message,
           })  
            
         }
   }

   // GET Single v
   const getSingleVehicle =async (req:Request,res:Response) => {

         try {
            const result = await vehicleService.getSingleVehicle(req.params.body as string)
            
           if(result.rows.length === 0 ){
            res.status(404).json({
                success:false,
                message:"Vehicle not found"
            })
        }
        else{
            res.status(200).json({
                success:true,
                message:"Vehicle retrieved successfully",
                data:result.rows[0],
            })
        }
         } catch (error:any) {
             res.status(500).json({
             success: false,
             message:error.message,
           })  
            
         }
   }

   // Update V

   // delete V
    const deleteVehicle = async(req:Request,res:Response) =>{
          
        try {
             const result = await vehicleService.deleteVehicle(req.params.id!)
            
            if(result.rowCount === 0 ){
            res.status(404).json({
                success:false,
                message:"Vehicle not found"
            })
        }
         else{
            res.status(200).json({
                success:true,
                message:"Vehicle deleted successfully",
               
            })
        }
        } catch (error:any) {
            res.status(500).json({
            success:false,
            message: error.message,
              }) 
        }
    }


   


export const vehicleController = {
        addVehicle,
        getAllVehicle,
        getSingleVehicle,
        deleteVehicle
}
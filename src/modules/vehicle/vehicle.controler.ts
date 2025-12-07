import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const  addVehicle = async(req:Request,res:Response)=>{
        const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;
       try {
         const result = await vehicleService.addVehicle(vehicle_name,type,registration_number,daily_rent_price,availability_status);
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
             success: true,
             message: "No vehicles found",
             data: []
           })  
            
         }
   }

   // GET Single v
   const getSingleVehicle =async (req:Request,res:Response) => {

         try {
            const result = await vehicleService.getSingleVehicle(req.params.vehicleId as string)
            
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

      const updateVehicle = async(req:Request,res:Response)=>{
               const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;
          
          //  console.log(result);
          try {
                const result = await vehicleService.updateVehicle(vehicle_name,type,registration_number,daily_rent_price,availability_status,req.params.vehicleId as string );
      
              if(result.rows.length === 0){
                  return res.status(404).json({
                         success:false,
                          message:"Vehicle not found"
                  });
                }
                 else{
                     res.status(200).json({
                         success:true,
                         message:"Vehicle updated successfully",
                         data:result.rows[0],
                     })
                 }
          } catch (error:any) {
                 res.status(500).json({
                   success: false,
                   message:error.message ,
                 })        
        }}

   // delete V
    const deleteVehicle = async(req:Request,res:Response) =>{
          
        try {
             const result = await vehicleService.deleteVehicle(req.params.vehicleId!)
            
            if(result.rowCount === 0 ){
            res.status(404).json({
                success:false,
                message:"Vehicle not successfully"
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
        updateVehicle,
        deleteVehicle
}
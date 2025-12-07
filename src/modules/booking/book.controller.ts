import { Request, Response } from "express";
import { bookingService } from "./book.service";

const  createBooking = async(req:Request,res:Response)=>{
       const {customer_id,vehicle_id,rent_start_date,rent_end_date} = req.body;
   
    try {
          const result = await bookingService.createBooking(customer_id,vehicle_id,rent_start_date,rent_end_date);

        res.status(201).json({
            success: true,
            message:"Booking created successfully",
            data:result
        })
    } catch (error:any) {
          console.error("Booking creation error:", error.message);
           res.status(500).json({
               success: true,
               message:"Booking creation failed",
               error: error.message
  })        
}}


const  getBooking = async (req:Request,res:Response) =>{
          const { role, id } = req.user!;
       try {
              const result = await bookingService.getAllBooking(role,id);
                
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
        
       }
}




const updateBooking = async (req:Request,res:Response)=>{
    const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price,status } = req.body;
    try {
        const result = await bookingService.updateBooking(customer_id,vehicle_id, rent_start_date, rent_end_date, total_price, status,req.params.bookingId as string);

        if(result.rows.length === 0 ){
              return res.status(404).json({
                   success:false,
                    message:"Booking data not found"
            });
        }
        else {
             res.status(200).json({
                 success: true,
                 message : "Booking data update successful",
                 data:result.rows[0]
    
             })
        }
        
    } catch (error:any) {
         res.status(500).json({
             success: false,
             message:error.message,
           })    
    }
      
}


 export  const bookingController = {
         createBooking,getBooking,updateBooking
 } 

import express, { Request, Response } from "express";
import { config } from "./config";
import { Pool } from "pg";
import initDB from "./config/db";
import { userRoute } from "./modules/user/user.route";
import { vehicleRoute } from "./modules/vehicle/vehicle.route";
import { bookingRoute } from "./modules/booking/book.route";

const app = express()
const port = config.port;
app.use(express.json());


initDB();


//User Reg. 
app.use("/api/v1/auth/signup",userRoute)   //* signup

//Vehicle 
app.use("/api/v1/vehicles",vehicleRoute)

//booking
app.use("/api/v1/bookings",bookingRoute)





app.get("/",(req:Request,res:Response)=>{
        res.status(200).json({
            message:"Api is working",
            path: req.path
        })
})

app.listen(port,()=>{
     console.log(`App is running port ${port}`);
})


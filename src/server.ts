import express, { Request, Response } from "express";
import { config } from "./config";
import { Pool } from "pg";
import initDB from "./config/db";
import { userRoute } from "./modules/user/user.route";

const app = express()
const port = config.port;
app.use(express.json());


initDB();



app.use("/api/v1/auth/users",userRoute)





app.get("/",(req:Request,res:Response)=>{
        res.status(200).json({
            message:"Api is working",
            path: req.path
        })
})

app.listen(port,()=>{
     console.log(`App is running port ${port}`);
})


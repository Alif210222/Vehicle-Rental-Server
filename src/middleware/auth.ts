import  jwt,{JwtPayload}  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import { config } from '../config';
import { pool } from '../config/db';

const auth = (...roles:string[]) =>{
      return async (req:Request , res:Response, next:NextFunction) =>{

     try {
           const token = req.headers.authorization?.split(" ")[1]
        // console.log(token)
              if(!token){
                   return res.status(401).json({
                    message: "You are not allowed",
                })
            }
           
            const decoded = jwt.verify(token,config.jwtSecret as string) as JwtPayload;

            //Getting user from db for 
            const user  = await pool.query(
                `SELECT * FROM users WHERE email=$1`, [decoded.email]
            )

            
      if (user.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }


            req.user = {
                 id: decoded.id,
                 email: decoded.email,
                 role: decoded.role
             };

              // role wise access
            if(roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    error:"Unauthorized Access",
                })
            }
            
            // console.log(decoded);
        
       next();

     } catch (error:any) {
               res.status(401).json({
                    success:false,
                    message:error.message,
                })   
     }

      }
}

export default auth;
import { pool } from "../../config/db"

const createUser = async(name:string, email:string , password : string , role : string) =>{
     const result = await pool.query(
            `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *`,[name,email,password,role]
         );

         return result;
}

export const userService = {
    createUser
}
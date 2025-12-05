
import { Pool } from "pg";
import { config } from ".";

//connection to db
export const pool = new Pool({
      connectionString : `${config.connection_str}` 
}) 


// create db table  
    const initDB = async() =>{
     await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name  VARCHAR(100) NOT NULL,
        role VARCHAR(100) DEFAULT user NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        update_at TIMESTAMP DEFAULT NOW()
        )
        `);
        console.log("Database connected")
     
}

export default initDB;
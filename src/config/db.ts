
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
        email VARCHAR(150) UNIQUE NOT NULL
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
        CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK (char_length(password) >= 6),
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(100) NOT NULL DEFAULT 'customer'
        CHECK (role IN ('admin', 'customer'))
        )
        `);
        // vehicle 
        await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(150) UNIQUE NOT NULL,
        registration_number VARCHAR(20) NOT NULL,
        daily_rent_price NUMERIC NOT NULL,
        availability_status TEXT NOT NULL
        )
        `);


        console.log("Database connected")
     
}

export default initDB;
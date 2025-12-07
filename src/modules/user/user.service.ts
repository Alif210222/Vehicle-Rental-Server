
import bcrypt from "bcryptjs";
import { pool } from "../../config/db"

const createUser = async(payload : Record<string,unknown>) =>{
    const {name,email,password,phone,role} = payload;

    const hashedPassword = await bcrypt.hash(password as string,12)
     const result = await pool.query(
            `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,[name,email,hashedPassword,phone,role]
         );
        delete result.rows[0].password;
         return result;
}


// get all user
const getUser = async() =>{
     const result = await  pool.query(`SELECT * FROM users`);
     delete result.rows[0].password;
     return result;
}


//get single user 
const getSingleUser = async(userId : string ) =>{
     const result = await  pool.query(`SELECT * FROM users WHERE id = $1` , [userId]);
     delete result.rows[0].password;
     return result;
}


// update user 
//  const updateUser = async( fields: { name?: string; email?: string; password?: string; phone?: string; role?: string },
//   userId: string)=>{



//         const query = role ? `UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *`
//          : `UPDATE users SET name=$1, email=$2, password=$3, phone=$4 WHERE id=$5 RETURNING *`;
            
//               const params = role ? [name, email, password, phone, role, userId]: [name, email, password, phone, userId];
            
//               const result = await pool.query(query, params);


//         delete result.rows[0].password;
//          return result;
// }
//-------------


const updateUser = async (
  fields: { name?: string; email?: string; password?: string; phone?: string; role?: string },
  userId: string
) => {
  const entries = Object.entries(fields).filter(([_, value]) => value !== undefined);

  if (entries.length === 0) {
    throw new Error("No fields to update");
  }

  const setQuery = entries.map(([key], index) => `${key}=$${index + 1}`).join(", ");
  const values = entries.map(([_, value]) => value);

  const query = `
    UPDATE users 
    SET ${setQuery}
    WHERE id = $${values.length + 1}
    RETURNING *;
  `;

  const result = await pool.query(query, [...values, userId]);

  if (result.rows[0]) {
    delete result.rows[0].password;
  }

  return result;
};




// delete user 
const deleteUser = async(userId : string)=>{
      
   // check user is already active on booking
       const bookingData = await pool.query(
         `SELECT id FROM bookings WHERE vehicle_id = $1 AND status = 'active'`,[userId]
        )
        if(bookingData.rows.length > 0){
           throw new Error("Cannot delete this user: Already booking exist") 
        }


      // delete uer
          const result = await pool.query(`DELETE FROM users WHERE id= $1 RETURNING *`,[userId])
          return result;
}

 

export const userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}
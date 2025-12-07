import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
const createUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, hashedPassword, phone, role]);
    delete result.rows[0].password;
    return result;
};
// get all user
const getUser = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    delete result.rows[0].password;
    return result;
};
//get single user 
const getSingleUser = async (userId) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    delete result.rows[0].password;
    return result;
};
// update user 
const updateUser = async (name, email, password, phone, role, userId) => {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6  RETURNING *`, [name, email, password, phone, role, userId]);
    delete result.rows[0].password;
    return result;
};
// delete user 
const deleteUser = async (userId) => {
    const result = await pool.query(`DELETE FROM users WHERE id= $1`, [userId]);
    return result;
};
export const userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
};

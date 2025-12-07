import { pool } from "../../config/db";
const addVehicle = async (vehicle_name, type, registration_number, daily_rent_price, availability_status) => {
    //const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = payload;
    const result = await pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status)
             VALUES($1,$2,$3,$4,$5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    // change the price type
    result.rows[0].daily_rent_price = Number(result.rows[0].daily_rent_price);
    return result;
};
// get VEHICLE
const getVehicle = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    result.rows[0].daily_rent_price = Number(result.rows[0].daily_rent_price);
    return result;
};
// get single V 
const getSingleVehicle = async (vehicleId) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    //  result.rows[0].daily_rent_price = Number(result.rows[0].daily_rent_price);
    return result;
};
// Update Vehicle
const updateVehicle = async (vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId) => {
    const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6  RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]);
    return result;
};
// delete V
const deleteVehicle = async (vehicleId) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id= $1`, [vehicleId]);
    return result;
};
export const vehicleService = {
    addVehicle,
    getVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
};

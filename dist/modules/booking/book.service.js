import { pool } from "../../config/db";
const createBooking = async (customer_id, vehicle_id, rent_start_date, rent_end_date) => {
    // 1. Get vehicle info
    const vehicleResult = await pool.query(`SELECT vehicle_name, daily_rent_price 
     FROM vehicles 
     WHERE id = $1`, [vehicle_id]);
    if (vehicleResult.rows.length === 0) {
        throw new Error("Vehicle not found");
    }
    const vehicle = vehicleResult.rows[0];
    const dailyRent = Number(vehicle.daily_rent_price);
    // 2. Calculate total days
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (days <= 0) {
        throw new Error("End date must be after start date");
    }
    // 3. Calculate total price
    const total_price = days * dailyRent;
    // 4. Insert booking
    const bookingResult = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"
    ]);
    const booking = bookingResult.rows[0];
    // 4. Update vehicle status to "booked"
    await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]);
    // 5. Attach vehicle info inside booking object
    booking.vehicle = {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: dailyRent
    };
    return booking;
};
// Get all booking 
const getAllBooking = async (role, userId) => {
    if (role === "admin") {
        return await pool.query(`SELECT * FROM bookings`);
    }
    // customer
    return await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [(userId)]);
};
//  Update booking data 
const updateBooking = async (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, bookingId) => {
    const result = await pool.query(`UPDATE bookings SET customer_id=$1, vehicle_id=$2, rent_start_date=$3, rent_end_date=$4, total_price=$5, status=$6 WHERE id=$7  RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, bookingId]);
    return result;
};
export const bookingService = { createBooking, getAllBooking, updateBooking };

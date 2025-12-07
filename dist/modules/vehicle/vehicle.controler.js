import { vehicleService } from "./vehicle.service";
const addVehicle = async (req, res) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicleService.addVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Vehicle created failed",
        });
    }
};
// get all V
const getAllVehicle = async (req, res) => {
    try {
        const result = await vehicleService.getVehicle();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "No vehicles found",
            data: []
        });
    }
};
// GET Single v
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicleService.getSingleVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Update V
const updateVehicle = async (req, res) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    //  console.log(result);
    try {
        const result = await vehicleService.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.vehicleId);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// delete V
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicleService.deleteVehicle(req.params.vehicleId);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not successfully"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const vehicleController = {
    addVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
};

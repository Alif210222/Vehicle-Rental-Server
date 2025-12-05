import { Request, Response, Router } from "express";
import { vehicleController } from "./vehicle.controler";



const router = Router();

router.post("/", vehicleController.addVehicle)
router.get("/", vehicleController.getAllVehicle)
router.get("/:vehicleId", vehicleController.getSingleVehicle)
//Update
router.delete("/:vehicleId", vehicleController.deleteVehicle)


 

export const vehicleRoute = router
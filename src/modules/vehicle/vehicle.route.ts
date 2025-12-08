import { Request, Response, Router } from "express";
import { vehicleController } from "./vehicle.controler";
import auth from "../../middleware/auth";



const router = Router();

router.post("/",auth("admin"), vehicleController.addVehicle)
router.get("/",auth("admin","customer"), vehicleController.getAllVehicle)
router.get("/:vehicleId",auth("admin","customer"), vehicleController.getSingleVehicle)
router.put("/:vehicleId",auth("admin"), vehicleController.updateVehicle)
router.delete("/:vehicleId",auth("admin"), vehicleController.deleteVehicle)


 

export const vehicleRoute = router
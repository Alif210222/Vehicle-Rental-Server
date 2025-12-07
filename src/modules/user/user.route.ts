import { Router } from "express";

import { userController } from "./user.controller";
import verify from "../../middleware/auth";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userController.createUser )
router.get("/",auth("admin"), userController.getUser)
router.get("/:userId", userController.getSingleUser)
router.put("/:userId",auth("admin","customer"), userController.updateUser) 
router.delete("/:userId",auth("admin"), userController.deleteUser) 

export const userRoute = router
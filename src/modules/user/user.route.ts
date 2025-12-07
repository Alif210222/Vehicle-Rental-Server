import { Router } from "express";

import { userController } from "./user.controller";
import verify from "../../middleware/auth";
import auth from "../../middleware/auth";

const router = Router();

router.post("/auth/signup", userController.createUser )
router.get("/users",auth("admin"), userController.getUser)   //auth("admin"),
router.get("/users/:userId", userController.getSingleUser)
router.put("/users/:userId",auth("admin","customer"), userController.updateUser) 
router.delete("/users/:userId",auth("admin"), userController.deleteUser) 

export const userRoute = router
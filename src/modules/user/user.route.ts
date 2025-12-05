import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser )
router.get("/", userController.getUser)
router.get("/:userId", userController.getSingleUser)
router.put("/:userId", userController.updateUser) 
router.delete("/:userId", userController.deleteUser) 

export const userRoute = router
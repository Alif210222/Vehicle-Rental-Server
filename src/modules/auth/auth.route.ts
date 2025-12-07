import { Router } from "express";
import { authController } from "./auth.controller";


const  router = Router();

//http://localhost:500/auth/login
router.post("/",authController.loginUser)


export const authRoutes = router ;
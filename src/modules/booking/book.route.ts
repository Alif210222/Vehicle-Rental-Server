import { Router } from "express";
import { bookingController } from "./book.controller";

const router = Router();

router.post("/", bookingController.createBooking)
router.get("/", bookingController.getBooking)



export const bookingRoute = router
import { Router } from "express";
import { bookingController } from "./book.controller";

const router = Router();

router.post("/", bookingController.createBooking)
router.get("/", bookingController.getBooking)
router.put("/:bookingId", bookingController.updateBooking)



export const bookingRoute = router
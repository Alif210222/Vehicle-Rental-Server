import { Router } from "express";
import { bookingController } from "./book.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth("admin","customer"), bookingController.createBooking)
router.get("/",auth("admin","customer"), bookingController.getBooking)
router.put("/:bookingId",auth("admin","customer"), bookingController.updateBooking)



export const bookingRoute = router
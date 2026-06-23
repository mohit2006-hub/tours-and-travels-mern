const express = require("express");

const {
  createBooking,
  getBookingsByUser,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);

router.get("/:userId", getBookingsByUser);

module.exports = router;
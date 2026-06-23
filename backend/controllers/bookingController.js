const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.params.userId,
    }).populate("tourId");

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookingsByUser,
};
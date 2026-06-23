const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    guestSize: {
      type: Number,
      required: true,
    },

    bookAt: {
      type: Date,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
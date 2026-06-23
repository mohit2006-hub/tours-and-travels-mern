const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    reviewText: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);

    const savedReview = await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviewsByTour = async (req, res) => {
  try {
    const reviews = await Review.find({ tourId: req.params.tourId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviewsByTour,
};
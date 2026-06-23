const express = require("express");

const {
  createReview,
  getReviewsByTour,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", createReview);

router.get("/:tourId", getReviewsByTour);

module.exports = router;
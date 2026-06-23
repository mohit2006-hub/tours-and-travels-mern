const express = require("express");

const {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  searchTours
} = require("../controllers/tourController");

const router = express.Router();

router.post("/", createTour);
router.get("/", getAllTours);
router.get("/search", searchTours);
router.get("/:id", getSingleTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
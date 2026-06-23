const Tour = require("../models/Tour");

const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);

    const savedTour = await newTour.save();

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getSingleTour = async (req, res) => {
  try {
    const id = req.params.id;

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const searchTours = async (req, res) => {
  try {
    const city = req.query.city;
    const maxPrice = req.query.maxPrice;
    const featured = req.query.featured;

    let query = {};

    if (city) {
      query.city = new RegExp(city, "i");
    }

    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    if (featured === "true") {
      query.featured = true;
    }

    const tours = await Tour.find(query);

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  searchTours
};
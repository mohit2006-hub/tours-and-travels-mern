const express = require("express");

const {
  addToWishlist,
  getWishlist
} = require("../controllers/wishlistController");

const router = express.Router();

router.post("/", addToWishlist);

router.get("/:userId", getWishlist);

module.exports = router;
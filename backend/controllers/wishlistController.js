const User = require("../models/User");

const addToWishlist = async (req, res) => {
  try {
    const { userId, tourId } = req.body;

    const user = await User.findById(userId);

    if (!user.wishlist.includes(tourId)) {
      user.wishlist.push(tourId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Tour added to wishlist"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("wishlist");

    res.status(200).json({
      success: true,
      data: user.wishlist
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist
};
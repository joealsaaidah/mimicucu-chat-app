const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
} = require("../controllers/users");

router.route("/:userId").get(protect, getUserProfile);
router.route("/update/:userId").put(protect, updateUserProfile);
router.route("/:id/follow").put(protect, followUser);
router.route("/:id/unfollow").put(protect, unfollowUser);

module.exports = router;

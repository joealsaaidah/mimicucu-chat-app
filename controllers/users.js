const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");
const { findOne } = require("../models/User");

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorResponse("Invalid ID", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new ErrorResponse("Invalid ID", 400));
    }
    const { username } = req.body;
    const isNotAvaliable = await User.findOne({ username });
    if (isNotAvaliable) {
      return next(new ErrorResponse("Not Avaliable", 404));
    }
    user.username = req.body.username;
    await user.save();
    res.status(201).json({
      success: true,
      data: "Profile Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) {
      return next(new ErrorResponse("Not Avaliable", 404));
    }
    if (currentUser._id == req.params.id) {
      return next(new ErrorResponse("you Can't follow yourself!", 403));
    }
    console.log(userToFollow._id);
    if (!userToFollow.followers.includes(currentUser._id)) {
      await userToFollow.updateOne({ $push: { followers: currentUser._id } });
      await currentUser.updateOne({ $push: { followings: userToFollow._id } });
      res.status(200).json({ success: true, data: "user has been followed" });
    } else {
      return next(new ErrorResponse("you already followed this user", 403));
    }
  } catch (error) {
    next(error);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const userToUnfollow = await User.findById(req.params.id);
    if (!userToUnfollow) {
      return next(new ErrorResponse("Not Avaliable", 404));
    }
    if (currentUser._id == req.params.id) {
      return next(new ErrorResponse("you Can't unfollow yourself!", 403));
    }
    if (userToUnfollow.followers.includes(currentUser._id)) {
      await userToUnfollow.updateOne({ $pull: { followers: currentUser._id } });
      await currentUser.updateOne({
        $pull: { followings: userToUnfollow._id },
      });
      res.status(200).json({ success: true, data: "user has been unfollowed" });
    } else {
      return next(new ErrorResponse("you are not friends", 403));
    }
  } catch (error) {
    next(error);
  }
};

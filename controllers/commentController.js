import Comment from "../models/Comment.js";
import Meme from "../models/Meme.js";
import User from "../models/User.js";

export const newComment = async (req, res) => {
  const { userid, memeid, comment } = req.body;
  let user, meme;
  try {
    user = await User.findById(userid);
    meme = await Meme.findById(memeid);

    const newComment = new Comment();
    newComment.comment = comment;
    newComment.meme = meme;
    newComment.user = user;

    await Comment.create(newComment);
    let comments = await Comment.find({
      meme: meme,
    })
      .sort("-createdAt")
      .populate("user", "username avatar");

    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
  }
};

export const newSubComment = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const { image, subComment, commentId } = req.body;
    const newSubComment = {
      user: user,
      subComment: subComment,
      image: image,
    };

    const comment = await Comment.findById(commentId)
      .populate("user", "username avatar")
      .populate({
        path: "subComments",
        populate: { path: "user", select: "username avatar" },
      });
    comment.subComments.push(newSubComment);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
  }
};

export const newSubReply = async (req, res) => {
  const { subComment, commentId, subReplytId, replyTo, id } = req.body;
  try {
    const user = await User.findById(id);
    const newSubComment = {
      user: user,
      subComment,
      replyTo,
      image: "",
    };
    let comment = await Comment.findById(commentId)
      .populate("user", "username avatar")
      .populate({
        path: "subComments",
        populate: { path: "user", select: "username avatar" },
      });
    const index = comment.subComments.findIndex((x) => x._id == subReplytId);
    comment.subComments.splice(index, 0, newSubComment);
    comment.save();
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
  }
};

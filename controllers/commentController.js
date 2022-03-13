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
    newComment.commentor.username = user.username;
    newComment.commentor.avatar = user.avatar;
    newComment.meme = meme;

    await Comment.create(newComment);
    let comments = await Comment.find({
      meme: meme,
    }).sort("-createdAt");

    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
  }
};

export const newSubComment = async (req, res) => {
  const { username, avatar, subComment, commentId } = req.body;
  const newSubComment = {
    commentor: username,
    subComment: subComment,
    avatar: avatar,
  };

  let comment;
  try {
    comment = await Comment.findById(commentId);
    comment.subComments.subComments.push(newSubComment);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
  }
};

export const newSubReply = async (req, res) => {
  const { commentor, avatar, subComment, commentId, subReplytId, replyTo } =
    req.body;
  const newSubComment = { commentor, avatar, subComment, replyTo };
  try {
    let comment = await Comment.findById(commentId);
    const index = comment.subComments.subComments.findIndex(
      (x) => x._id == subReplytId
    );
    comment.subComments.subComments.splice(index, 0, newSubComment);
    comment.save();
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
  }
};

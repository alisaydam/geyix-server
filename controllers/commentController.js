import Comment from "../models/Comment.js";
import Meme from "../models/Meme.js";
import User from "../models/User.js";

export const newComment = async (req, res) => {
  const { userid, memeid, comment } = req.body;
  console.log(req.body);
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

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
  }
};

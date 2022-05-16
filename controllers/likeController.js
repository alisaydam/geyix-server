import Comment from "../models/Comment.js";
import Meme from "../models/Meme.js";
import User from "../models/User.js";

export const likeMeme = async (req, res) => {
  console.log(req.headers);
  const { memeid, username } = req.params;
  let meme;
  try {
    let user = await User.findOne({ username: username });
    if (!username || !user) return;
    meme = await Meme.findById(memeid);
    if (meme.likes.includes(username) || meme.dislikes.includes(username)) {
      let likes;
      let dislikes;
      if (meme.dislikes.includes(username)) {
        dislikes = meme.dislikes.filter((x) => x !== username);
        meme.dislikes = [...dislikes];
        meme.likes = [username, ...meme.likes];
      } else {
        likes = meme.likes.filter((x) => x !== username);
        meme.likes = [...likes];
      }
    } else {
      meme.likes = [username, ...meme.likes];
    }
    await Meme.create(meme);
  } catch (error) {
    console.log(error);
  }
  res.send(meme);
};

export const dislikeMeme = async (req, res) => {
  const { memeid, username } = req.params;
  let meme;
  try {
    let user = await User.findOne({ username: username });
    if (!username || !user) return;
    meme = await Meme.findById(memeid);
    if (meme.likes.includes(username) || meme.dislikes.includes(username)) {
      let likes;
      let dislikes;
      if (meme.likes.includes(username)) {
        likes = meme.likes.filter((x) => x !== username);
        meme.likes = [...likes];
        meme.dislikes = [username, ...meme.dislikes];
      } else if (meme.dislikes.includes(username)) {
        dislikes = meme.dislikes.filter((x) => x !== username);
        meme.dislikes = [...dislikes];
      }
    } else {
      meme.dislikes = [username, ...meme.dislikes];
    }
    await Meme.create(meme);
    res.status(201).send(meme);
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async (req, res) => {
  const { commentid, username } = req.params;
  let comment;
  try {
    const user = await User.findOne({ username: username });
    if (!user || !username) return;
    comment = await Comment.findById(commentid);
    if (
      comment.dislikes.includes(username) ||
      comment.likes.includes(username)
    ) {
      let dislikes;
      let likes;
      if (comment.dislikes.includes(username)) {
        dislikes = comment.dislikes.filter((x) => x !== username);
        comment.dislikes = [...dislikes];
        comment.likes = [username, ...comment.likes];
      } else if (comment.likes.includes(username)) {
        likes = comment.likes.filter((x) => x !== username);
        comment.likes = [...likes];
      }
    } else {
      comment.likes = [username, ...comment.likes];
    }
    await Comment.create(comment);
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
  }
};

export const dislikeComment = async (req, res) => {
  const { commentid, username } = req.params;
  let comment;
  try {
    const user = await User.findOne({ username: username });
    if (!user || !username) return;
    comment = await Comment.findById(commentid);
    if (
      comment.likes.includes(username) ||
      comment.dislikes.includes(username)
    ) {
      let likes;
      let dislikes;
      if (comment.likes.includes(username)) {
        likes = comment.likes.filter((x) => x !== username);
        comment.likes = [...likes];
        comment.dislikes = [username, ...comment.dislikes];
      } else if (comment.dislikes.includes(username)) {
        dislikes = comment.dislikes.filter((x) => x !== username);
        comment.dislikes = [...dislikes];
      }
    } else {
      comment.dislikes = [username, ...comment.dislikes];
    }
    await Comment.create(comment);

    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
  }
};

export const likeSubComment = async (req, res) => {
  const { username, commentid, subCommentid } = req.params;

  try {
    let comment = await Comment.findById(commentid);
    const subComment = comment.subComments.subComments.find(
      (sub) => sub._id == subCommentid
    );
    if (subComment.dislikes.includes(username)) {
      subComment.dislikes.splice(subComment.dislikes.indexOf(username), 1);
    }
    if (subComment.likes.includes(username)) {
      subComment.likes.splice(subComment.likes.indexOf(username), 1);
    } else {
      subComment.likes.push(username);
    }
    comment.subComment = subComment;
    comment.save().catch((e) => {
      console.log(e);
    });
    res
      .status(201)
      .json({ likes: subComment.likes, dislikes: subComment.dislikes });
  } catch (error) {
    console.log(error);
  }
};

export const dislikeSubComment = async (req, res) => {
  const { username, commentid, subCommentid } = req.params;

  try {
    let comment = await Comment.findById(commentid);
    const subComment = comment.subComments.subComments.find(
      (sub) => sub._id == subCommentid
    );
    if (subComment.likes.includes(username)) {
      subComment.likes.splice(subComment.likes.indexOf(username), 1);
    }
    if (subComment.dislikes.includes(username)) {
      subComment.dislikes.splice(subComment.dislikes.indexOf(username), 1);
    } else {
      subComment.dislikes.push(username);
    }
    comment.subComment = subComment;
    comment.save().catch((e) => {
      console.log(e);
    });
    res
      .status(201)
      .json({ likes: subComment.likes, dislikes: subComment.dislikes });
  } catch (error) {
    console.log(error);
  }
};
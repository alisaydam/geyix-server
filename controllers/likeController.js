import Comment from "../models/Comment.js";
import Meme from "../models/Meme.js";

export const like = async (req, res, next) => {
  const { memeid, username } = req.params;
  let meme;
  try {
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

export const dislike = async (req, res) => {
  const { memeid, username } = req.params;
  let meme;
  try {
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

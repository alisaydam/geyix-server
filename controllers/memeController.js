import Meme from "../models/Meme.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const newMeme = async (req, res) => {
  const { id, title, meme } = req.body;
  try {
    const user = await User.findById(id);
    const newMeme = await Meme.create({ title, meme, user: user });
    res
      .status(201)
      .json({ success: true, newMeme, message: "Meme min kaydedildi." });
  } catch (error) {
    console.log(error);
  }
};

export const getMemes = async (req, res) => {
  const { page, limit } = req.query;
  const startIndex = page * limit;
  let results;
  try {
    results = await Meme.find()
      .sort("-createdAt")
      .limit(limit)
      .skip(startIndex)
      .exec();

    res.send(results);
  } catch (error) {
    console.log(error);
  }
};

export const getOneById = async (req, res) => {
  const id = req.params.id;
  try {
    let meme = await Meme.findById(id);
    let comments = await Comment.find({
      meme: meme,
    }).sort("-createdAt");
    res.status(201).json({ meme, comments });
  } catch (error) {
    console.log(error);
  }
};

export const getUserMemes = async (req, res) => {
  console.log("geliy");
  const { username, section, page, limit } = req.query;
  const startIndex = page * limit;
  let posts;
  if (section === "posts") {
    try {
      const user = await User.findOne({ username: username });
      posts = await Meme.find({ user: user })
        .sort("-createdAt")
        .limit(limit)
        .skip(startIndex)
        .exec();
    } catch (error) {
      console.log(error);
    }
  }
  if (section === "liked") {
    try {
      posts = await Meme.find({
        likes: { $in: [username] },
      })
        .sort("-createdAt")
        .limit(limit)
        .skip(startIndex)
        .exec();
    } catch (error) {
      console.log(error);
    }
  }
  if (section === "commented") {
    ("dwawd");
  }
  res.send(posts);
};

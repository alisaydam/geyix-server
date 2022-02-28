import Meme from "../models/Meme.js";
import User from "../models/User.js";

export const newMeme = async (req, res) => {
  console.log(req);
  console.log(req.body);
  const { id, title, meme } = req.body;
  try {
    const user = await User.findById(id);
    console.log(user);
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
  let meme;
  try {
    meme = await Meme.findById(id);
    res.status(201).send(meme);
  } catch (error) {
    console.log(error);
  }
};
import User from "../models/User.js";
import Meme from "../models/Meme.js";
import bycypt from "bcrypt";

export const newUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "Kayıt başarılı, giriş yapınız",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const match = await bycypt.compare(password, user.password);
    if (match && user) {
      res.send({
        success: true,
        user: {
          _id: user.id,
          avatar: user.avatar,
          username: user.username,
        },
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, error: "Yanlış şifre yada email" });
  }
};

export const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });

    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
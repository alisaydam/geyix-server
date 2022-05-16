import User from "../models/User.js";
import bycypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: "geyix@outlook.com",
    pass: "2153401Ali.",
  },
});

export const newUserEmailSend = async (req, res) => {
  console.log(req.body);
  const payload = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  const newUserHref = `<a href="http://localhost:3000/validateUser/${payload}">Üyeliği onaylamak için tıklayınız<a/>`;

  const options = {
    from: "geyix@outlook.com",
    to: req.body.email,
    subject: "Üyelik Aktivasyonu",
    html: newUserHref,
  };
  try {
    transporter.sendMail(options, (err, info) => {
      if (err) return console.log(err);
    });
    res.status(201).json({
      success: true,
      message:
        "Kayıt başarılı, aktive etmek için mailinize gelen linki tıklayınız",
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const createNewUser = async (req, res) => {
  const { name, username, email, password } = jwt.verify(
    req.params.userJWT,
    process.env.ACCESS_TOKEN_SECRET
  );
  console.log(name, username, email, password);
  try {
    await User.create({ name, username, email, password });
    res.status(201).json({
      user: name,
      success: true,
      message: `Tebribler ${name}! Üyeliğniz aktive edilmiştir, lütfen giriş yapınız`,
    });
  } catch (error) {
    res.status(400).json({ error: error });
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
          dwdwadwad,
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

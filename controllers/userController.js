import User from "../models/User.js";
import bycypt, { hash } from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const newUserEmailSend = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASS,
    },
  });
  const payload = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  const newUserHref = `<a href="https://geyix.org/validateUser/${payload}">Üyeliği onaylamak için tıklayınız<a/>`;

  const options = {
    from: "geyix@outlook.com",
    to: req.body.email,
    subject: "Üyelik Aktivasyonu",
    html: newUserHref,
  };
  try {
    const info = await transporter.sendMail(options);
    res.status(201).json({
      success: true,
      message:
        "Kayıt başarılı, aktive etmek için mailinize gelen linki tıklayınız",
    });
  } catch (error) {
    console.log(error);
    res
      .status(201)
      .json({ success: false, message: "User can not be created" });
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

export const createNewUser = async (req, res) => {
  try {
    const { name, username, email, password } = jwt.verify(
      req.params.userJWT,
      process.env.ACCESS_TOKEN_SECRET
    );
    await User.create({ name, username, email, password });
    res.status(201).json({
      user: name,
      email: email,
      success: true,
      message: `Tebribler ${name}! Üyeliğniz aktive edilmiştir, lütfen giriş yapınız`,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      success: false,
      message: "User can not be created",
    });
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

export const forgotPasswordEmailSend = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASS,
    },
  });
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) throw new Error("Üye değilsiniz");
    const payload = jwt.sign({ email: req.params.email }, user.password, {
      expiresIn: "24h",
    });
    const email = jwt.verify(payload, user.password);
    const forgotPassHref = `<a href="https://geyix.org/passReset/${payload}/${req.params.email}">Üyeliği onaylamak için tıklayınız<a/>`;
    const options = {
      from: process.env.OUTLOOK_EMAIL,
      to: req.params.email,
      subject: "Şifre Yenileme",
      html: forgotPassHref,
    };

    if (user.length === 0) throw new Error("Üye değilsiniz");
    const info = await transporter.sendMail(options);
    res.status(201).json({
      success: true,
      message: "Şifre sıfırlama emaili gönderildi.",
    });
  } catch (error) {
    console.log(error);

    res.status(201).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password, email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const emaill = jwt.verify(token, user.password);
    const pass = await bycypt.hash(password, 10);
    await User.updateOne({ email: email }, { $set: { password: pass } });
    res.status(200).json({ success: true, message: "Şifre güncellendi." });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Yanlış ya da kullanılmış geçmiş istek.",
    });
  }
};

import { check, validationResult } from "express-validator";
import User from "../models/User.js";

export const registerValidation = [
  check("email")
    .trim()
    .notEmpty()
    .custom(async (email) => {
      const user = await User.findOne({ email: email });
      if (user) return Promise.reject("Email kullanımda");
    }),
  check("username")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .custom(async (username) => {
      const user = await User.findOne({ username: username });
      if (user)
        return Promise.reject(
          "Kullanıcı adı kullanımda, lütfen başka bir kullanıcı adı seçiniz"
        );
    }),
  check("password", "Şifre en az 8 karakter uzunluğunda olmalı")
    .trim()
    .notEmpty()
    .isLength({ min: 8 }),
];

export const checkErrorsForRegister = async (req, res, next) => {
  const errors = validationResult(req)
    .array()
    .map((error) => error.msg);

  errors.length > 0 ? res.status(401).json({ success: false, errors }) : next();
};

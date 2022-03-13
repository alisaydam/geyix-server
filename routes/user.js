import { Router } from "express";
import { newUser, login, getUser } from "../controllers/userController.js";
import {
  registerValidation,
  checkErrorsForRegister,
} from "../middlewares/registerValidation.js";

const router = Router();

router.post("/newuser", registerValidation, checkErrorsForRegister, newUser);
router.post("/login", login);
router.get("/:username", getUser);

export default router;

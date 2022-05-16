import { Router } from "express";
import {
  newUserEmailSend,
  login,
  getUser,
  createNewUser,
} from "../controllers/userController.js";
import {
  registerValidation,
  checkErrorsForRegister,
} from "../middlewares/registerValidation.js";

const router = Router();

router.post(
  "/newuser",
  registerValidation,
  checkErrorsForRegister,
  newUserEmailSend
);
router.get("/createUser/:userJWT", createNewUser);
router.post("/login", login);
router.get("/:username", getUser);

export default router;

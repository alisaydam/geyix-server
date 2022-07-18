import { Router } from "express";
import {
  newUserEmailSend,
  login,
  getUser,
  resetPassword,
  createNewUser,
  forgotPasswordEmailSend,
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
router.get("/getOne/:username", getUser);
router.get("/forgotPass/:email", forgotPasswordEmailSend);
router.post("/resetPassword", resetPassword); 
export default router;

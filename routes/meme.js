import { Router } from "express";
import {
  newMeme,
  getMemes,
  getOneById,
  getUserMemes,
} from "../controllers/memeController.js";
import { checkJWT } from "../middlewares/checkJWT.js";

const router = Router();

router.post("/newMeme", checkJWT, newMeme);
router.get("/getUserMemes", getUserMemes);
router.get("/getMemes", getMemes);
router.get("/getOneById/:id", getOneById);

export default router;

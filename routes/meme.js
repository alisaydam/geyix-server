import { Router } from "express";
import {
  newMeme,
  getMemes,
  getOneById,
} from "../controllers/memeController.js";

const router = Router();

router.post("/newMeme", newMeme);
router.get("/getMemes", getMemes);
router.get("/:id", getOneById);

export default router;

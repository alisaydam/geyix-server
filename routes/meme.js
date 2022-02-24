import { Router } from "express";
import { newMeme, getMemes } from "../controllers/memeController.js";

const router = Router();

router.post("/newMeme", newMeme);
router.get("/getMemes", getMemes);

export default router;

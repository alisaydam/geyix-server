import { Router } from "express";
import { like, dislike } from "../controllers/likeController.js";

const router = Router();

router.get("/like/:memeid/:username", like);
router.get("/dislike/:memeid/:username", dislike);

export default router;

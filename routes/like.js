import { Router } from "express";
import {
  likeMeme,
  dislikeMeme,
  likeComment,
  dislikeComment,
} from "../controllers/likeController.js";

const router = Router();

router.get("/likeMeme/:username/:memeid", likeMeme);
router.get("/dislikeMeme/:username/:memeid", dislikeMeme);
router.get("/likeComment/:username/:commentid", likeComment);
router.get("/dislikeComment/:username/:commentid", dislikeComment);

export default router;

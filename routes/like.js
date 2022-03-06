import { Router } from "express";
import {
  likeMeme,
  dislikeMeme,
  likeComment,
  dislikeComment,
  likeSubComment,
  dislikeSubComment,
} from "../controllers/likeController.js";

const router = Router();

router.get("/likeMeme/:username/:memeid", likeMeme);
router.get("/dislikeMeme/:username/:memeid", dislikeMeme);
router.get("/likeComment/:username/:commentid", likeComment);
router.get("/dislikeComment/:username/:commentid", dislikeComment);
router.get(
  "/likeSubComment/:username/:commentid/:subCommentid",
  likeSubComment
);
router.get(
  "/dislikeSubComment/:username/:commentid/:subCommentid",
  dislikeSubComment
);

export default router;

import { Router } from "express";
import {
  likeMeme,
  dislikeMeme,
  likeComment,
  dislikeComment,
  likeSubComment,
  dislikeSubComment,
} from "../controllers/likeController.js";
import { checkJWT } from "../middlewares/checkJWT.js";

const router = Router();

router.get("/likeMeme/:username/:memeid", checkJWT, likeMeme);
router.get("/dislikeMeme/:username/:memeid", checkJWT, dislikeMeme);
router.get("/likeComment/:username/:commentid", checkJWT, likeComment);
router.get("/dislikeComment/:username/:commentid", checkJWT, dislikeComment);
router.get(
  "/likeSubComment/:username/:commentid/:subCommentid",
  checkJWT,
  likeSubComment
);
router.get(
  "/dislikeSubComment/:username/:commentid/:subCommentid",
  checkJWT,
  dislikeSubComment
);

export default router;

import { Router } from "express";
import {
  newComment,
  newSubComment,
  newSubReply,
} from "../controllers/commentController.js";
import { checkJWT } from "../middlewares/checkJWT.js";

const router = Router();

router.post("/newcomment", checkJWT, newComment);
router.post("/newSubComment", checkJWT, newSubComment);
router.post("/newSubReply", checkJWT, newSubReply);

export default router;

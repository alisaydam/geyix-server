import { Router } from "express";
import {
  newComment,
  newSubComment,
  newSubReply,
} from "../controllers/commentController.js";

const router = Router();

router.post("/newcomment", newComment);
router.post("/newSubComment", newSubComment);
router.post("/newSubReply", newSubReply);

export default router;

import { Router } from "express";
import { newComment, newSubComment } from "../controllers/commentController.js";

const router = Router();

router.post("/newcomment", newComment);
router.post("/newSubComment", newSubComment);

export default router;

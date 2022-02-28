import { Router } from "express";
import user from "./user.js";
import meme from "./meme.js";
import comment from "./comment.js";
import like from "./like.js";
const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).send("You are at Meme server");
});

routes.use("/user", user);
routes.use("/meme", meme);
routes.use("/comment", comment);
routes.use("/like", like);

export default routes;

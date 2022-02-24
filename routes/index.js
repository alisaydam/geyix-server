import { Router } from "express";
import user from "./user.js";
import meme from "./meme.js";
const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).send("You are at Meme server");
});

routes.use("/user", user);
routes.use("/meme", meme);

export default routes;

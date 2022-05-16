import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import nodemailer from "nodemailer";



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Could not connect to DB");
  });

import routes from "./routes/index.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
 


app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started with ${PORT} port`);
});

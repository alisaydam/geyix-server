import { mongoose, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    meme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meme",
    },
    commentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subComments: [
      {
        commentor: String,
        comment: String,
        avatar: String,
      },
    ],
  },
  { timestamps: true }
);

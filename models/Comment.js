import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    meme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meme",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subComments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        subComment: String,
        replyTo: {
          type: String,
          default: "",
        },
        image: {
          type: String,
          default: "",
        },
        likes: [],
        dislikes: [],
      },
    ],
    likes: [],
    dislikes: [],
  },

  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;

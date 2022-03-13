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
    commentor: {
      username: String,
      avatar: String,
    },
    subComments: {
      subComments: [
        {
          commentor: String,
          subComment: String,
          avatar: String,
          replyTo: String,
          likes: [],
          dislikes: [],
        },
      ],
    },
    likes: [],
    dislikes: [],
  },

  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;

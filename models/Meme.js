import mongoose from "mongoose";

const MemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    meme: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["komig", "politik", "ver mehteri"],
      default: "komig",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [],
    dislikes: [],
  },
  { timestamps: true }
);

const Meme = mongoose.model("Meme", MemeSchema);
export default Meme;

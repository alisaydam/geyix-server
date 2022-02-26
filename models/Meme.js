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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meme",
      },
    ],
    likes: [],
    dislikes: [],
  },
  { timestamps: true }
);

const Meme = mongoose.model("Meme", MemeSchema);
export default Meme;

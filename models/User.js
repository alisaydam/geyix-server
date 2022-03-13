import mongoose from "mongoose";
import bycypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://avatars.dicebear.com/v2/male/:seed.svg",
    },
    role: {
      type: String,
      enum: ["user", "admin", "god"],
      default: "user",
    },
    memes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meme",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bycypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bycypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

export default User;

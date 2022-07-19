import jwt from "jsonwebtoken";

export const decodeUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

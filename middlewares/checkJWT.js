import jwt from "jsonwebtoken";

export const checkJWT = (req, res, next) => {
   if (!req.headers.authorization) {
     return res.status(401).json({ success: false, error: "Invalid token" });
   }

   const token = req.headers.authorization.split(" ")[1];
   try {
     const jwtPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
     res.locals.jwtPayload = jwtPayload;
   } catch (error) {
     return res.status(401).json({ success: false, error: "Invalid token" });
   }
   next();
};

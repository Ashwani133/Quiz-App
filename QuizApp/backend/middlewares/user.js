import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";

async function usermiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedData = await jwt.verify(token, JWT_USER_PASSWORD);
  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.json({
      message: "You are not logged in!",
    });
  }
}

export { usermiddleware };

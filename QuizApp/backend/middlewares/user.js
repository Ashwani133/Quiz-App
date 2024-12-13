import Jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";

async function usermiddleware(req, res, next) {
  const token = req.header.token;
  const decodedData = await jwt.verify(token, JWT_USER_PASSWORD);
  console.log(decodedData);
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

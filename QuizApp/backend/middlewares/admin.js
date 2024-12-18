import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config.js";

async function AdminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_ADMIN_PASSWORD);
  if (decodedData) {
    req.adminId = decodedData.id;
    next();
  } else {
    res.json({
      message: "You are not logged in",
    });
  }
}

export { AdminMiddleware };

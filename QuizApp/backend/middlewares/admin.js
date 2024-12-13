import { Jwt } from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config";

async function AdminMiddleware(req, res, next) {
  const token = req.header.token;
  const decodedData = await Jwt.verify(token, JWT_ADMIN_PASSWORD);
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

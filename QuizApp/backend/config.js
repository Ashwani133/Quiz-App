import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_SECRET;
export { JWT_USER_PASSWORD };

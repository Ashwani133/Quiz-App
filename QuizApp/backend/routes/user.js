import { Router } from "express";
const userRouter = Router();
import { z } from "zod";
import bcrypt from "bcrypt";
import { userModel } from "../models/db.js";
import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";
// <-- User Signup Api -->
userRouter.post("/signup", async function (req, res) {
  const { email, username, password } = req.body;

  const userSchema = z.object({
    email: z.string().max(100).email(),
    username: z.string().min(3).max(100),
    password: z
      .string()
      .min(6)
      .max(100)
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, {
        message:
          "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      }),
  });

  const parsedUserData = userSchema.safeParse({
    email: email,
    username: username,
    password: password,
  });

  if (!parsedUserData.success) {
    res.status(400).json({
      message: "please enter valid details",
      error: parsedUserData.error.issues[0].message,
      path: parsedUserData.error.issues[0].path[0], // it tells what signup input field has invalid entries.
    });
    return;
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email: normalizedEmail,
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "New user signed up!",
    });
  } catch (e) {
    if (e.code === 11000) {
      const duplicateField = Object.keys(e.keyValue)[0];
      res.status(400).json({
        message: `A user with this ${duplicateField} already exists.`,
      });
    } else {
      res.status(500).json({
        message: "An internal error occured. Please try again later.",
      });
    }
  }
});

// <-- User Signin Api -->
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const userSigninSchema = z.object({
    email: z.string().max(100).email(),
    password: z
      .string()
      .min(6)
      .max(100)
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, {
        message:
          "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      }),
  });

  const userSigninParsedData = userSigninSchema.safeParse({
    email: email,
    password: password,
  });

  if (!userSigninParsedData.success) {
    res.status(400).json({
      message: "Invalid credentials!",
    });
    return;
  }

  try {
    const response = await userModel.findOne({ email: email });
    if (!response) {
      res.status(403).json({
        message: "User does not exist",
      });
      return;
    }

    const passwordMatched = await bcrypt.compare(password, response.password);
    if (passwordMatched) {
      const token = jwt.sign(
        {
          id: response._id,
        },
        JWT_USER_PASSWORD
      );

      res.status(200).json({
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Invalid credentials!",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "An internal error occured. Please try again later!",
      error: e.error,
    });
  }
});

export { userRouter };

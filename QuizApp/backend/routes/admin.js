import { Router } from "express";
const adminRouter = Router();
import { z } from "zod";
import { adminModel } from "../models/db";
import bcrypt from "bcrypt";
import { JWT_ADMIN_PASSWORD } from "../config";

adminRouter.post("/signup", async function (req, res) {
  const { email, username, password } = req.body;
  const adminSchema = z.object({
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

  const parsedAdminData = adminSchema.safeParse({
    email: email,
    username: username,
    password: password,
  });
  if (!parsedAdminData.success) {
    res.status(400).json({
      message: "please enter valid details",
      error: parsedAdminData.error.issues[0].message,
      path: parsedAdminData.error.issues[0].path[0], // it tells what signup input field has invalid entries.
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, JWT_ADMIN_PASSWORD);
    await adminModel.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "New admin signed up!",
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

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const adminSigninSchema = z.object({
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

  const adminSigninParsedData = adminSigninSchema.safeParse({
    email: email,
    password: password,
  });

  if (!adminSigninParsedData.success) {
    res.status(400).json({
      message: "Invalid credentials!",
    });
    return;
  }
  try {
    const response = await adminModel.findOne({ email: email });
    if (!response) {
      res.status(403).json({
        message: "Admin does not exist",
      });
      return;
    }

    const passwordMatched = await bcrypt.compare(password, response.password);
    if (passwordMatched) {
      const token = jwt.sign(
        {
          id: response._id,
        },
        JWT_ADMIN_PASSWORD
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

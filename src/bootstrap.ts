import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import authRouter from "./modules/auth/auth.controller";
import userRouter from "./modules/user/user.controller";
import postRouter from "./modules/post/post.controller";
import { connectToDatabase } from "./DB/mongoose.connection";
import { AppError } from "./utils/error.exceptions";

export async function bootstrap(): Promise<void> {
  dotenv.config({ path: path.resolve(process.cwd(), "config/.env") });

  const app = express();
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Route not found", 404));
  });

  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const message = error instanceof AppError ? error.message : "Internal server error";
    res.status(statusCode).json({ error: message });
  });

  try {
    await connectToDatabase();
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error("Could not start the application:", error);
    process.exitCode = 1;
  }
}

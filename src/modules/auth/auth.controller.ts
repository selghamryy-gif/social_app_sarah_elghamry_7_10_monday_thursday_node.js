import { Router, Request, Response, NextFunction } from "express";
import { validateBody } from "../../middleware/validation.middleware";
import { loginSchema, signupSchema } from "./auth.validation";
import { login, signup } from "./auth.service";

const router = Router();

router.post("/signup", validateBody(signupSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await signup(req.body.name, req.body.email, req.body.password);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", validateBody(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await login(req.body.email, req.body.password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;

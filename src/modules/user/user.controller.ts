import { Router, Request, Response, NextFunction } from "express";
import { getProfile } from "./user.service";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getProfile(req.params.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;

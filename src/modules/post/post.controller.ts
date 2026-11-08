import { Router, Request, Response, NextFunction } from "express";
import Joi from "joi";
import { validateBody } from "../../middleware/validation.middleware";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "./post.service";

const router = Router();
const createPostSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  content: Joi.string().trim().min(1).required(),
  author: Joi.string().trim().min(1).required()
});
const updatePostSchema = Joi.object({
  title: Joi.string().trim().min(1),
  content: Joi.string().trim().min(1)
}).min(1);

router.post("/", validateBody(createPostSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await createPost(req.body.title, req.body.content, req.body.author);
    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ posts: await getAllPosts() });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ post: await getPostById(req.params.id) });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateBody(updatePostSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await updatePost(req.params.id, req.body.title, req.body.content);
    res.json({ post });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deletePost(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;

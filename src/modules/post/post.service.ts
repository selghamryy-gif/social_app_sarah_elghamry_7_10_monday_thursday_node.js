import mongoose from "mongoose";
import { Post } from "./post.model";
import { BadRequestError, NotFoundError } from "../../utils/error.exceptions";

export async function createPost(title: string, content: string, author: string) {
  return Post.create({ title, content, author });
}

export async function getAllPosts() {
  return Post.find().sort({ createdAt: -1 });
}

export async function getPostById(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError("Invalid post id");
  }

  const post = await Post.findById(id);
  if (!post) {
    throw new NotFoundError("Post not found");
  }
  return post;
}

export async function updatePost(id: string, title?: string, content?: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError("Invalid post id");
  }

  const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true });
  if (!post) {
    throw new NotFoundError("Post not found");
  }
  return post;
}

export async function deletePost(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError("Invalid post id");
  }

  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    throw new NotFoundError("Post not found");
  }
  return post;
}

import mongoose, { Document, Schema } from "mongoose";

export interface PostDocument extends Document {
  title: string;
  content: string;
  author: string;
}

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Post = mongoose.model<PostDocument>("Post", postSchema);

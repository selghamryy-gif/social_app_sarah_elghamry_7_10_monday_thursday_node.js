import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { AppError, BadRequestError } from "../../utils/error.exceptions";

export async function signup(name: string, email: string, password: string) {
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    throw new BadRequestError("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });

  return { id: user.id, name: user.name, email: user.email };
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Email or password is incorrect", 401);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing from config/.env");
  }

  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" });
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

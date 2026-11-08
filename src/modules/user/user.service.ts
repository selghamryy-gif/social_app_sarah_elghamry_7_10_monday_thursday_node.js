import { User } from "./user.model";
import { NotFoundError } from "../../utils/error.exceptions";

export async function getProfile(userId: string) {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

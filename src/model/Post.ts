import { PostImage } from "./PostImage";
import { User } from "./User";

export interface Post {
  postId: number;
  content: string;
  Images: PostImage[];
  createdAt: Date;
  User: User;
}

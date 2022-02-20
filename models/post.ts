import { Comments } from "./comments";

export interface Post {
  comments: Comments;
  content: string;
  postDate: string;
  title: string;
}

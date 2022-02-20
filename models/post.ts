import { Comment } from "./comment";

export interface Post {
  comments: Comment[];
  content: string;
  postDate: string;
  title: string;
}

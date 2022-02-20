export const FETCH_POSTS = "FETCH_POSTS";
export const UPDATE_VOTE = "UPDATE_VOTE";
import { Posts } from "../../models/posts";

export const fetchPosts = (posts: Posts) => {
  return { type: FETCH_POSTS, payload: posts };
};

export const updateVote = (
  postId: string,
  commentId: string,
  userId: string,
  isIncrement: boolean
) => {
  return {
    type: UPDATE_VOTE,
    payload: { postId, commentId, userId, isIncrement },
  };
};

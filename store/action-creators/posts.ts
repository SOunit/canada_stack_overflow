import { Posts } from "../../models/posts";
import { ActionType } from "../action-types";

export const fetchPosts = (posts: Posts) => {
  return { type: ActionType.FETCH_POSTS, payload: posts };
};

export const updateVote = (
  postId: string,
  commentId: string,
  userId: string,
  isIncrement: boolean
) => {
  return {
    type: ActionType.UPDATE_VOTE,
    payload: { postId, commentId, userId, isIncrement },
  };
};

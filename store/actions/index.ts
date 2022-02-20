import { Posts } from "../../models/posts";
import { ActionType } from "../action-types";

interface AuthenticateAction {
  type: ActionType.AUTHENTICATE;
  token: string;
  userId: string;
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}

export type AuthAction = AuthenticateAction | LogoutAction;

interface FetchPostAction {
  type: ActionType.FETCH_POSTS;
  payload: Posts;
}

interface UpdatePostAction {
  type: ActionType.UPDATE_VOTE;
  payload: {
    postId: string;
    commentId: string;
    userId: string;
    isIncrement: boolean;
  };
}

export type PostAction = FetchPostAction | UpdatePostAction;

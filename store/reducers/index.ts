import { combineReducers } from "redux";
import authReducer from "../reducers/auth";
import postsReducer from "../reducers/posts";

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

// for useSelector hook
export type RootState = ReturnType<typeof rootReducer>;

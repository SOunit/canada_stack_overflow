import { INIT_POSTS } from "../actions/posts";

interface postsState {
  posts: any[];
}

const initialState = { posts: [] };

export default (state: postsState = initialState, action) => {
  switch (action.type) {
    case INIT_POSTS:
      return { posts: action.payload };
    default:
      return state;
  }
};

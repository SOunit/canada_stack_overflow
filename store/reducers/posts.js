import { INIT_POSTS } from "../actions/posts";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_POSTS:
      return action.payload;
    default:
      return state;
  }
};

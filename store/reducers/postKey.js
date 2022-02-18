import { INIT_POST_KEY } from "../actions/postKey";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_POST_KEY:
      return action.payload;
    default:
      return state;
  }
};

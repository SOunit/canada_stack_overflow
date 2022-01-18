import { STOREPOSTS } from "../actions/posts";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case STOREPOSTS:
      return [action.payload];
    default:
      return state;
  }
};

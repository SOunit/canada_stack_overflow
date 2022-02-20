import { FETCH_POSTS } from "../actions/posts";

const initialState = [];

// const descendDateSort = (arr) => {
//   return arr.sort((a, b) => {
//     return new Date(b.postDate) - new Date(a.postDate);
//   });
// };

// const descendVoteSort = (arr) => {
//   return arr.sort(
//     (a, b) => b[value].votedUserIdList.length - a[value].votedUserIdList.length
//   );
// };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS: {
      return action.payload;
    }
    default:
      return state;
  }
};

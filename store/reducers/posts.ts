import { FETCH_POSTS, UPDATE_VOTE } from "../actions/posts";

const initialState = [];

// const descendDateSort = (arr) => {
//   return arr.sort((a, b) => {
//     return new Date(b.postDate) - new Date(a.postDate);
//   });
// };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS: {
      return action.payload;
    }

    case UPDATE_VOTE: {
      const { postId, commentId, userId, isIncrement } = action.payload;
      const targetPost = { ...state[postId] };
      const targetComment = { ...targetPost.comments[commentId] };

      // update comment vote
      if (isIncrement) {
        targetComment.voteCount += 1;
        if (targetComment.voteUserIdList) {
          // if voteUserIdList exist
          targetComment.voteUserIdList = [
            ...targetComment.voteUserIdList,
            userId,
          ];
        } else {
          // if voteUserIdList not exist
          targetComment.voteUserIdList = [userId];
        }
      } else {
        targetComment.voteCount -= 1;
        targetComment.voteUserIdList = targetComment.voteUserIdList.filter(
          (id: string) => id !== userId
        );
      }

      const updatedState = {
        ...state,
        [postId]: {
          ...targetPost,
          comments: {
            ...targetPost.comments,
            [commentId]: targetComment,
          },
        },
      };

      return updatedState;
    }

    default:
      return state;
  }
};

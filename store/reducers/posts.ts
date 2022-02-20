import { Posts } from "../../models/posts";
import { PostAction } from "../actions";
import { ActionType } from "../action-types";

const initialState: Posts = {};

// const descendDateSort = (arr) => {
//   return arr.sort((a, b) => {
//     return new Date(b.postDate) - new Date(a.postDate);
//   });
// };

export default (state: Posts = initialState, action: PostAction) => {
  switch (action.type) {
    case ActionType.FETCH_POSTS: {
      return action.payload;
    }

    case ActionType.UPDATE_VOTE: {
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
        targetComment.voteUserIdList = targetComment.voteUserIdList!.filter(
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

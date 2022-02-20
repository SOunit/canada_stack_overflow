export const FETCH_POSTS = "FETCH_POSTS";
export const UPDATE_VOTE = "UPDATE_VOTE";

export const fetchPosts = (posts) => {
  return { type: FETCH_POSTS, payload: posts };
};

export const updateVote = (
  postId: string,
  commentId: string,
  userId: string,
  isIncrement: boolean
) => {
  return {
    type: UPDATE_VOTE,
    payload: { postId, commentId, userId, isIncrement },
  };
};

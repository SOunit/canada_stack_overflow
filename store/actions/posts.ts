export const FETCH_POSTS = "FETCH_POSTS";

export const fetchPosts = (posts) => {
  return { type: FETCH_POSTS, payload: posts };
};

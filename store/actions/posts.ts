export const INIT_POSTS = "INIT_POSTS";

export const fetchPosts = (posts) => {
  return { type: INIT_POSTS, payload: posts };
};

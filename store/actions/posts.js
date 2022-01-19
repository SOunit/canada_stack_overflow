export const INIT_POSTS = "INIT_POSTS";

export const initPosts = (posts) => {
  return { type: INIT_POSTS, payload: posts };
};

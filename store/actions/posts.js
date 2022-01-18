export const STORE_POSTS = "STORE_POSTS";

export const storePosts = (posts) => {
  return { type: STORE_POSTS, payload: posts };
};

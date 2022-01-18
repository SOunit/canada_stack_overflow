export const STOREPOSTS = "get_post";

export const storePosts = (posts) => {
  return { type: STOREPOSTS, payload: posts };
};

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (token, userId) => {
  return { type: AUTHENTICATE, token, userId };
};

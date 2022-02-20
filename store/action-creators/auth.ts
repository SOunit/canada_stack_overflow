import { ActionType } from "../action-types";

export const authenticate = (token: string, userId: string) => {
  return { type: ActionType.AUTHENTICATE, token, userId };
};

export const logout = () => {
  return { type: ActionType.LOGOUT };
};

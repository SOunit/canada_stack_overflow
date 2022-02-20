import { ActionType } from "../action-types";
import { AuthAction } from "../actions";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      return { ...state, token: action.token, userId: action.userId };
    }

    case ActionType.LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};

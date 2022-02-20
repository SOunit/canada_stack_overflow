import { AUTHENTICATE, LOGOUT } from "../actions/auth";

interface AuthenticateAction {
  type: string;
  token: string;
  userId: string;
}

interface LogoutAction {
  type: string;
}

type AuthAction = AuthenticateAction & LogoutAction;

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return { ...state, token: action.token, userId: action.userId };
    }

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};

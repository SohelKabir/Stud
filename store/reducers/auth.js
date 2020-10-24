import { LOGIN, SIGNUP, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        user: action.user,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

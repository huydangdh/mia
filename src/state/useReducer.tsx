// userReducer.tsx
import { UserActionTypes, ADD_USER, REMOVE_USER, User } from './useActions'

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;


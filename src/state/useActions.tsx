// userActions.tsx
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export interface User {
  id: number;
  name: string;
}

export interface AddUserAction {
  type: typeof ADD_USER;
  payload: User;
}

export interface RemoveUserAction {
  type: typeof REMOVE_USER;
  payload: number; // userId
}

export type UserActionTypes = AddUserAction | RemoveUserAction;

export const addUser = (user: User): UserActionTypes => ({
  type: ADD_USER,
  payload: user,
});

export const removeUser = (userId: number): UserActionTypes => ({
  type: REMOVE_USER,
  payload: userId,
});


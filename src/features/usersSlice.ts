import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../model';
import { RootState } from '../store';

interface UsersState {
  availableUsers: User[];
  selectedUser?: User;
}

const initialState: UsersState = {
  availableUsers: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, { payload }: PayloadAction<{ user: User }>) => ({
      ...state,
      selectedUser: payload.user,
    }),

    setUsers: (state, { payload }: PayloadAction<{ users: User[] }>) => ({
      ...state,
      availableUsers: payload.users,
      selectedUser: payload.users.length > 0 ? payload.users[0] : undefined,
    }),
  },
});

export const { selectUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer;

export const selectAvailableUsers = (state: RootState) =>
  state.users.availableUsers;

export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUser;

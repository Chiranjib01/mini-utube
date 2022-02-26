import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../../types/UserType';
import Cookie from 'js-cookie';

interface UserState {
  user: UserType | null;
}

const initialState: UserState = {
  user: Cookie.get('user') ? JSON.parse(Cookie.get('user')!) : null,
};

const loginUserReducer = (
  state: UserState,
  payload: PayloadAction<UserType>
) => {
  Cookie.set('user', JSON.stringify(payload.payload));
  state.user = payload.payload;
};
const logoutUserReducer = (state: UserState) => {
  Cookie.remove('user');
  state.user = null;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: loginUserReducer,
    logoutUser: logoutUserReducer,
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

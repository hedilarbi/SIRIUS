import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},

  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setUserToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        user: {},
      };
    },
    clearUserToken: (state) => {
      return {
        ...state,

        token: null,
      };
    },
  },
});
export const { setUser, setUserToken, clearUser, clearUserToken } =
  userSlice.actions;
export const selectUserToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

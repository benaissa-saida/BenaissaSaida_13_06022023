import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { firstName: null, lastName: null, email: null, id: null },
  reducers: {
    setUserInfos: (state, action) => {
      const { body } = action.payload;
      state.firstName = body.firstName;
      state.lastName = body.lastName;
      state.email = body.email;
      state.id = body.id;
    },
  },
});

export const { setUserInfos } = userSlice.actions;

export default userSlice.reducer;

export const selectFirstName = (state) => state.user.firstName;
export const selectLastName = (state) => state.user.lastName;
export const selectCurrentName = (state) =>
  `${state.user.firstName} ${state.user.lastName}`;
export const selectCurrentEmail = (state) => state.user.email;
export const selectCurrentId = (state) => state.user.id;

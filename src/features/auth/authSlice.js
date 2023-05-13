import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", //nom de mon slice
  initialState: { token: null }, //etat initial de mon slice
  reducers: {
    // fonction qui va accepter l'état actuel et une action qu'on veut faire
    setCredentials: (state, action) => {
      //action qui nous permet de sauvegarder notre token après l'avoir reçu de ma requête
      const { body } = action.payload;
      state.token = body.token;
    },
    logOut: (state) => {
      // action qui va changer l'état de mon token pour le vider et
      // nous permettre de quitter le dashboard
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

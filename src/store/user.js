import { createAction, createReducer } from "@reduxjs/toolkit";
import { message } from "antd";

export const setUser = createAction("SET_USER");
export const resetUser = createAction("RESET_USER");
export const addFavourite = createAction("ADD_FAVOURITE");
export const deleteFavourite = createAction("DELETE_FAVOURITE");

const initialState = {
    name: "",
    lastname: "",
    email: "",
    favorites: []
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return action.payload;
  })
  .addCase(resetUser, (state, action) => {
    return initialState;
  })
  .addCase(addFavourite, (state, action) => {
    if (state.favorites.find((fav) => fav.id === action.payload.id)) {
      message.error(`Item already in favorites`);
      return state;
    }
    message.success(`Item added to favorites`);
    return { ...state, favorites: [...state.favorites, action.payload] };
  })
  .addCase(deleteFavourite, (state, action) => {
    message.success(`Item removed from favorites`);
    return {
      ...state,
      favorites: state.favorites.filter((fav) => fav.id !== action.payload.id),
    };
  })
});

export default reducer;

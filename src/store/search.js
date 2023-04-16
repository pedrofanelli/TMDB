import { createAction, createReducer } from "@reduxjs/toolkit";

export const someSearch = createAction("SOME_SEARCH");
export const resetSearch = createAction("RESET_SEARCH");

const initialState = [];

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(someSearch, (state, action) => {
    return action.payload;
  })
  .addCase(resetSearch, (state, action) => {
    return initialState;
  })
});
  
export default reducer;

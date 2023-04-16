import { createAction, createReducer } from "@reduxjs/toolkit";


export const setOtherUserF = createAction("SET_OTHER_USER_F");
export const setOtherUserInfo = createAction("SET_OTHER_USER_INFO");
export const resetOther = createAction("RESET_OTHER");

const initialState = {
  favorites: [],
  fullname: ""
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setOtherUserF, (state, action) => {
    return {...state, favorites: action.payload};
  })
  .addCase(resetOther, (state, action) => {
    return initialState;
  })
  .addCase(setOtherUserInfo, (state, action) => {
    return {...state, fullname: action.payload};
  })
});
  
export default reducer;
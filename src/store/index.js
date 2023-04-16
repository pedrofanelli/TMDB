import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import searchReducer from "./search";
import otherUserReducer from "./otherUser";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    search: searchReducer,
    other: otherUserReducer
  },
});

export default store;

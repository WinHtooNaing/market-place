import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const combinedReducer = combineReducers({
  user: userReducer,
});

const persistReducers = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: {
    reducer: persistReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

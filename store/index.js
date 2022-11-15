import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./services/auth";
import { tasksApi } from "./services/tasks";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    tasksApi.middleware,
    authApi.middleware,
  ],
});

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reposReducers from "./slice/repos";

const rootReducer = combineReducers({
  repos: reposReducers,
});
export const setupStore = () => configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

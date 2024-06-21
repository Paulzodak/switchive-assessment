import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import navSlice, { INavState } from "@/slices/navSlice";
import productSlice, { IProductState } from "@/slices/productSlice";

const persistConfig = {
  key: "root_web..902hi",
  storage,
  blacklist: [],
  timeout: 5,
};

const rReducer = combineReducers({
  nav: navSlice,
  product: productSlice,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === "user/logOutUser") {
    // state.user = undefined;
    // state.notifications = undefined;
    // state.wishlist = [];
  }
  return rReducer(state, action);
};
const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisted,
  // middleware: [thunk],
});

export let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export interface IRootState {
  nav: INavState;
  product: IProductState;
}

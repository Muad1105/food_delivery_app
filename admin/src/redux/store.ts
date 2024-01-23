import { configureStore } from "@reduxjs/toolkit";
import showSectionReducer from "./displaySectionReducer";
import showChangesReducer from "./showItemChangesReducer";

console.log('store changes triggered');
export const store = configureStore({
  
  reducer: {
    showSection: showSectionReducer,
    showChanges: showChangesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

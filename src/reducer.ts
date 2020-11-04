import { combineReducers } from "redux";
import postsReducer from "./features/posts/posts.slice";
import settingsReducer from "./features/settings/settings.slice";
import savedPostsReducer from "./features/saved-posts/saved-posts.slice";

const reducer = combineReducers({
  posts: postsReducer,
  settings: settingsReducer,
  savedPosts: savedPostsReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;

import { combineReducers } from "redux";
import postsReducer from "./features/posts/posts.slice";

const reducer = combineReducers({ posts: postsReducer });

export default reducer;

export type RootState = ReturnType<typeof reducer>;

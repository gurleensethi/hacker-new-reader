import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HackerPost } from "../../api/hackerNewsApi";
import SavedPostsService from "../../services/saved-posts-service";

const savedPostsService = new SavedPostsService();

interface SavedPostsState {
  posts: HackerPost[];
}

interface SavePostPayload {
  post: HackerPost;
}

const initialState: SavedPostsState = {
  posts: [],
};

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    loadSavedPosts(state) {
      state.posts = savedPostsService.getSavedPosts();
    },
    savePost(state, action: PayloadAction<SavePostPayload>) {
      savedPostsService.savePost(action.payload.post);
      state.posts = savedPostsService.getSavedPosts();
    },
  },
});

export default savedPostsSlice.reducer;

export const { loadSavedPosts, savePost } = savedPostsSlice.actions;

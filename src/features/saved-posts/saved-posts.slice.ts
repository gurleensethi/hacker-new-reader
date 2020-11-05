import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HackerPost } from "../../api/hackerNewsApi";
import SavedPostsService from "../../services/saved-posts-service";

const savedPostsService = new SavedPostsService();

interface SavedPostsState {
  posts: HackerPost[];
  postKeys: Record<number, boolean>;
}

interface SavePostPayload {
  post: HackerPost;
}

const initialState: SavedPostsState = {
  posts: [],
  postKeys: {},
};

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    loadSavedPosts(state) {
      state.posts = savedPostsService.getSavedPosts();
      state.postKeys = state.posts.reduce<Record<number, boolean>>(
        (collector, post) => {
          collector[post.id] = true;
          return collector;
        },
        {}
      );
    },
    savePost(state, action: PayloadAction<SavePostPayload>) {
      const { post } = action.payload;
      savedPostsService.savePost(post);
      state.posts = savedPostsService.getSavedPosts();
      state.postKeys[post.id] = true;
    },
  },
});

export default savedPostsSlice.reducer;

export const { loadSavedPosts, savePost } = savedPostsSlice.actions;

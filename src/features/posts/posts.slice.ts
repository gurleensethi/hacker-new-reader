import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getPostById,
  getTopStories,
  HackerPost,
} from "../../api/hackerNewsApi";
import { AppThunk } from "../../store";

interface PostsState {
  isFetching: boolean;
  currentPage: number;
  topStories: number[];
  displayPosts: HackerPost[];
  pageNumber: number;
  err?: string;
}

interface PostsFetchSuccessPayload {
  posts: number[];
}

interface PostsFetchFailedPayload {
  err: string;
}

interface DisplayPostsFetchSuccessPayload {
  posts: HackerPost[];
}

interface DisplayPostsFetchFailurePayload {
  err: string;
}

const initialState: PostsState = {
  isFetching: false,
  currentPage: 0,
  topStories: [],
  displayPosts: [],
  err: undefined,
  pageNumber: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postFetchStart(state) {
      state.isFetching = true;
    },
    postFetchStop(state) {
      state.isFetching = false;
    },
    postFetchSuccess(state, action: PayloadAction<PostsFetchSuccessPayload>) {
      state.err = undefined;
      state.topStories = action.payload.posts;
    },
    displayPostFetchSuccess(
      state,
      action: PayloadAction<DisplayPostsFetchSuccessPayload>
    ) {
      state.displayPosts = action.payload.posts;
    },
    displayPostFetchFailure(
      state,
      action: PayloadAction<DisplayPostsFetchFailurePayload>
    ) {
      state.err = action.payload.err;
    },
    postFetchFailed(state, action: PayloadAction<PostsFetchFailedPayload>) {
      state.err = action.payload.err;
    },
  },
});

export const {
  postFetchFailed,
  postFetchStart,
  postFetchStop,
  postFetchSuccess,
  displayPostFetchSuccess,
  displayPostFetchFailure,
} = postsSlice.actions;

export default postsSlice.reducer;

export const fetchPostsByIds = (ids: number[]): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(postFetchStart());

    try {
      const promises = ids.map(getPostById);
      const posts = await Promise.all(promises);
      dispatch(displayPostFetchSuccess({ posts }));
    } catch (err) {
      dispatch(displayPostFetchFailure({ err: err.toString() }));
    }

    dispatch(postFetchStop());
  };
};

export const fetchTopStories = (): AppThunk => {
  return async (dispatch, getState) => {
    const state = getState();
    const start = state.posts.pageNumber * state.settings.data.pageSize;
    const end = start + state.settings.data.pageSize;

    let selectedPostsIds: number[];

    // If posts have not already been loaded.
    if (!state.posts.topStories.length) {
      dispatch(postFetchStart());
      try {
        const data = await getTopStories();
        dispatch(postFetchSuccess({ posts: data }));
        selectedPostsIds = data.slice(start, end);
      } catch (err) {
        dispatch(postFetchFailed({ err: err.toString() }));
        dispatch(postFetchStop());
        return;
      }
    } else {
      selectedPostsIds = state.posts.topStories.slice(start, end);
    }

    dispatch(fetchPostsByIds(selectedPostsIds));
  };
};

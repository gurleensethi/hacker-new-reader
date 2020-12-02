import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { HackerPost } from "../../api/hackerNewsApi";
import { fetchTopStories } from "../../features/posts/posts.slice";
import {
  loadSavedPosts,
  savePost,
} from "../../features/saved-posts/saved-posts.slice";
import { RootState } from "../../reducer";
import PostsList from "./PostsList";

const Container = styled.div`
  flex: 1;
  height: 100%;
  padding-bottom: 64px;
  overflow: hidden;
`;

const PostsPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { isFetching, displayPosts, err } = useSelector(
    (state: RootState) => state.posts
  );
  const savedPostKeys = useSelector(
    (state: RootState) => state.savedPosts.postKeys
  );

  useEffect(() => {
    dispatch(fetchTopStories());
    dispatch(loadSavedPosts());
  }, [dispatch]);

  const handleSavePostClicked = (post: HackerPost) => {
    dispatch(savePost({ post }));
  };

  return (
    <Container>
      {isFetching && <div>Fetching...</div>}
      {err && <div>{err}</div>}
      {!err && (
        <PostsList
          posts={displayPosts}
          onSavePostClicked={handleSavePostClicked}
          savedPostKeys={savedPostKeys}
        />
      )}
    </Container>
  );
};

export default PostsPage;

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

const ShadowContainer = styled.div`
  height: 100%;
  position: relative;
`;

const ShadowTop = styled.div`
  background: linear-gradient(white, rgba(255, 255, 255, 0.2));
  position: absolute;
  height: 50px;
  width: 100%;
  z-index: 10000;
`;

const ShadowBottom = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.2), white);
  position: absolute;
  height: 50px;
  width: 100%;
  z-index: 10000;
  /* background-color: red; */
  bottom: 0px;
  z-index: 10000;
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
        <ShadowContainer>
          <ShadowTop />
          <PostsList
            posts={displayPosts}
            onSavePostClicked={handleSavePostClicked}
            savedPostKeys={savedPostKeys}
          />
          <ShadowBottom />
        </ShadowContainer>
      )}
    </Container>
  );
};

export default PostsPage;

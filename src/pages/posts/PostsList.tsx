import React from "react";
import styled from "styled-components";
import { HackerPost } from "../../api/hackerNewsApi";
import breakPoints from "../../config/break-points";
import PostItem from "./PostItem";

const List = styled.div`
  display: flex;
  flex-direction: column;

  ${breakPoints.tablet} {
    width: 60%;
    margin: 0 auto;
  }
`;

interface Props {
  posts: HackerPost[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <List>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </List>
    </>
  );
};

export default PostsList;

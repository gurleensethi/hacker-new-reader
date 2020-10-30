import React from "react";
import styled from "styled-components";
import { HackerPost } from "../../api/hackerNewsApi";
import PostItem from "./PostItem";

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  posts: HackerPost[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </List>
  );
};

export default PostsList;

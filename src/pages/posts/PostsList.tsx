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
  onSavePostClicked: (post: HackerPost) => void;
}

const PostsList: React.FC<Props> = ({ posts, onSavePostClicked }) => {
  return (
    <>
      <List>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onSavePostClicked={() => onSavePostClicked(post)}
          />
        ))}
      </List>
    </>
  );
};

export default PostsList;

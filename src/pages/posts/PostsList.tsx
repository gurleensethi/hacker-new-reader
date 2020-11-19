import React from "react";
import styled from "styled-components";
import { HackerPost } from "../../api/hackerNewsApi";
import breakPoints from "../../config/break-points";
import PostItem from "./PostItem";

const List = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 20px #e1e1e1;
  border-radius: 8px;
  margin: 16px;
  overflow: hidden;

  ${breakPoints.tablet} {
    max-width: 60%;
    margin: 40px auto;
  }
`;

interface Props {
  posts: HackerPost[];
  onSavePostClicked: (post: HackerPost) => void;
  savedPostKeys: Record<number, boolean>;
}

const PostsList: React.FC<Props> = ({
  posts,
  onSavePostClicked,
  savedPostKeys,
}) => {
  return (
    <List>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onSavePostClicked={() => onSavePostClicked(post)}
          isSaved={!!savedPostKeys[post.id]}
        />
      ))}
    </List>
  );
};

export default PostsList;

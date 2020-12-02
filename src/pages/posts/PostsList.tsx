import React from "react";
import styled from "styled-components";
import { HackerPost } from "../../api/hackerNewsApi";
import breakPoints from "../../config/break-points";
import PostItem from "./PostItem";

const List = styled.div`
  border-radius: 8px;
  height: 100%;
  overflow: scroll;
  background-color: white;
  padding: 28px 0px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &-::-webkit-scrollbar {
    display: none;
  }

  ${breakPoints.tablet} {
    max-width: 70%;
    margin: 0px auto;
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

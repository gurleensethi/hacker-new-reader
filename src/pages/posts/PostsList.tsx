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
  savedPostKeys: Record<number, boolean>;
}

const PostsList: React.FC<Props> = ({
  posts,
  onSavePostClicked,
  savedPostKeys,
}) => {
  return (
    <>
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
    </>
  );
};

export default PostsList;

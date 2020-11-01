import React, { useState } from "react";
import styled from "styled-components";
import { HackerPost } from "../../api/hackerNewsApi";
import breakPoints from "../../config/break-points";
import PostItem from "./PostItem";
import BottomSheetOptionsDialog from "../../components/dialogs/BottomSheetOptionsDialog";

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
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOptionsClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <List>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onOptionsClick={handleOptionsClick}
          />
        ))}
      </List>
      <BottomSheetOptionsDialog
        isOpen={isDialogOpen}
        onDialogClose={handleDialogClose}
        options={[
          {
            name: "Save for later",
            key: "save_later",
            iconUrl: process.env.PUBLIC_URL + "/images/save.svg",
          },
        ]}
        onOptionClicked={(key: string) => {}}
      />
    </>
  );
};

export default PostsList;

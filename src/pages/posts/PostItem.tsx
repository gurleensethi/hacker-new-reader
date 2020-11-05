import React, { useState } from "react";
import { HackerPost } from "../../api/hackerNewsApi";
import styled from "styled-components";
import dayjs from "dayjs";
import breakPoints, { DeviceType } from "../../config/break-points";
import DropdownMenu from "../../components/dropdown/DropdownMenu";
import BottomSheetOptionsDialog from "../../components/dialogs/BottomSheetOptionsDialog";
import useDeviceType from "../../hooks/useDeviceType";

interface Props {
  post: HackerPost;
  onSavePostClicked: () => void;
  isSaved: boolean;
}

const PostItem: React.FC<Props> = ({ post, onSavePostClicked, isSaved }) => {
  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const deviceType = useDeviceType();

  const handleDialogClose = () => {
    setOptionsMenuOpen(false);
  };

  const handleOptionsClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOptionsMenuOpen(true);
  };

  const handleMenuOptionClicked = (key: string) => {
    switch (key) {
      case "save_later": {
        onSavePostClicked();
        break;
      }
    }
    setOptionsMenuOpen(false);
  };

  return (
    <>
      <Container href={post.url} target="_blank" rel="noopener noreferrer">
        <Content>
          <Main>
            <Title>{post.title}</Title>
            <Hostname>{post.hostname}</Hostname>
          </Main>
          <Info>
            <Date>{dayjs(post.time * 1000).format("ddd DD/MM/YYYY")}</Date>
            <Comments>{post.descendants}</Comments>
            <img
              src={process.env.PUBLIC_URL + "/images/comment.svg"}
              alt="comment icon"
              height="16"
            />
            <Score>{post.score}</Score>
            <img
              src={process.env.PUBLIC_URL + "/images/score.svg"}
              alt="comment icon"
              height="16"
            />
          </Info>
        </Content>
        <Options>
          {deviceType === DeviceType.MOBILE ? (
            <>
              <MoreOptionsIcon
                onClick={handleOptionsClick}
                src={process.env.PUBLIC_URL + "/images/vertical-more.svg"}
                alt="comment icon"
              />
              <BottomSheetOptionsDialog
                isOpen={isOptionsMenuOpen}
                onClose={handleDialogClose}
                options={[
                  {
                    name: isSaved ? "Already Saved" : "Save for later",
                    key: "save_later",
                    iconUrl: process.env.PUBLIC_URL + "/images/save.svg",
                    disabled: isSaved,
                  },
                ]}
                onOptionClicked={handleMenuOptionClicked}
              />
            </>
          ) : (
            <DropdownMenu
              alignment="right"
              isOpen={isOptionsMenuOpen}
              onClose={handleDialogClose}
              options={[
                {
                  name: isSaved ? "Already Saved" : "Save for later",
                  key: "save_later",
                  iconUrl: process.env.PUBLIC_URL + "/images/save.svg",
                  disabled: isSaved,
                },
              ]}
              onOptionClick={handleMenuOptionClicked}
              icon={() => (
                <MoreOptionsIcon
                  onClick={handleOptionsClick}
                  src={process.env.PUBLIC_URL + "/images/vertical-more.svg"}
                  alt="comment icon"
                />
              )}
            />
          )}
          <OpenIcon
            src={process.env.PUBLIC_URL + "/images/open-in-new.svg"}
            alt="comment icon"
          />
        </Options>
      </Container>
    </>
  );
};

export default PostItem;

const OpenIcon = styled.img`
  opacity: 0;
  transition: 0.3s;
  position: absolute;
  right: 0;
  bottom: 0;

  ${breakPoints.tablet} {
    position: relative;
    right: -5px;
  }
`;

const Container = styled.a`
  position: relative;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 6px;
  transition: 0.3s;
  display: flex;
  align-items: stretch;
  text-decoration: none;
  color: black;
  outline: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 10px rgb(230, 230, 230),
      -4px 4px 10px rgb(230, 230, 230), 4px 4px 10px rgb(230, 230, 230);
  }

  ${breakPoints.tablet} {
    &:hover ${OpenIcon} {
      right: 0px;
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const Main = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 12px;
  align-items: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 4px;
`;

const Hostname = styled.div`
  font-size: 12px;
  color: #999999;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  font-size: 16px;
  color: grey;
  flex: 1;
  min-width: 120px;
`;

const Comments = styled.div`
  font-size: 16px;
  color: grey;
  padding: 3px 6px;
  display: inline-block;
  border-radius: 16px;
  min-width: 28px;
  text-align: center;
  min-width: 30px;
`;

const Score = styled.div`
  font-size: 16px;
  color: grey;
  padding: 3px 6px;
  display: inline-block;
  border-radius: 16px;
  min-width: 28px;
  text-align: center;
  margin-left: 16px;
  min-width: 30px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MoreOptionsIcon = styled.img`
  border-radius: 24px;
  height: 32px;
  padding: 4px;
  transition: 0.3s;

  &:hover {
    background-color: #e1e1e1;
  }
`;

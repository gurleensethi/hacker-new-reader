import React from "react";
import { HackerPost } from "../../api/hackerNewsApi";
import styled from "styled-components";
import dayjs from "dayjs";
import breakPoints from "../../config/break-points";

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
  align-items: center;
  text-decoration: none;
  color: black;
  outline: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 10px rgb(230, 230, 230),
      -4px 4px 10px rgb(230, 230, 230), 4px 4px 10px rgb(230, 230, 230);
  }

  &:active {
    background-color: rgb(220, 220, 220);
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
  flex: 1;
`;

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 12px;
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

interface Props {
  post: HackerPost;
}

const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <Container href={post.url} target="_blank" rel="noopener noreferrer">
      <Content>
        <Main>
          <Title>{post.title}</Title>
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
      <OpenIcon
        src={process.env.PUBLIC_URL + "/images/open-in-new.svg"}
        alt="comment icon"
      />
    </Container>
  );
};

export default PostItem;

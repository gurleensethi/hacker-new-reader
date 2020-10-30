import React from "react";
import { HackerPost } from "../../api/hackerNewsApi";
import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled.div`
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 6px;
  display: inline-block;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 10px rgb(230, 230, 230),
      -4px 4px 10px rgb(230, 230, 230), 4px 4px 10px rgb(230, 230, 230);
  }

  &:active {
    background-color: rgb(220, 220, 220);
  }
`;

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 12px;
`;

const Date = styled.div`
  font-size: 16px;
  color: grey;
`;

interface Props {
  post: HackerPost;
}

const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Date>{dayjs(post.time * 1000).format("dddd DD/MM/YYYY")}</Date>
    </Container>
  );
};

export default PostItem;

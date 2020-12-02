import React from "react";
import styled from "styled-components";
import PostsPage from "../posts/PostsPage";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  z-index: 1;
  padding: 16px;
  background-color: transparent;
`;

const Title = styled.div`
  flex: 1;
  font-size: 20px;
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <TopBar>
        <Title>HackerNews</Title>
        <img
          src={process.env.PUBLIC_URL + "/images/settings.svg"}
          alt="settings"
        />
      </TopBar>
      <PostsPage />
    </Container>
  );
};

export default HomePage;

import React from "react";
import styled from "styled-components";
import PostsPage from "../posts/PostsPage";

const Container = styled.div`
  padding-top: 40px;
`;

const TopBar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: linear-gradient(
    white,
    white,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  padding: 16px;
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

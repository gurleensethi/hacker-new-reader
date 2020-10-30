import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopStories } from "../../features/posts/posts.slice";
import { RootState } from "../../reducer";

const HomePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { isFetching, displayPosts } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchTopStories());
  }, [dispatch]);

  return (
    <div>
      {isFetching && <div>Fetching...</div>}
      <div>
        {displayPosts.map((post) => {
          return <div>{post.title}</div>;
        })}
      </div>
    </div>
  );
};

export default HomePage;

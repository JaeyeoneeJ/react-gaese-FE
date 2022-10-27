import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "../elements/Button";
import LogoItem from "../elements/LogoItem";
import { useNavigate } from "react-router-dom";
import { __getPosts } from "../../redux/modules/dbPostsSlice";
import Post from "../post/Post";
import Loading from "../feature/Loading";

const PostListJJY = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(__getPosts());
  }, []);

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <Padding>
      <LogoCtn>
        <LogoItem stroke="#CCECDD" size="80" strokeWidth="3" />
        <Button
          onClick={() => navigate("/posts/add")}
          width="80%"
          maxWidth="300px"
          bgColor="#d9d9d9"
          border="2px solid #C5C5C5"
          fontSize="16px"
          color="white"
        >
          Click To Posting!!!
        </Button>
      </LogoCtn>
      <PostListCtn>
        {/* {posts?.slice(0).reverse().map((post)=>{ */}
        {posts?.map((post) => {
          return <Post key={post.postId} post={post} />;
        })}
      </PostListCtn>
    </Padding>
  );
};
const Padding = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const LogoCtn = styled.div`
    margin: 55px auto 10px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
`
const PostListCtn = styled.div`
  margin: 30px auto 0 auto;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  justify-content: center;
  padding: initial;
  flex-wrap: wrap;
`;

export default PostListJJY;

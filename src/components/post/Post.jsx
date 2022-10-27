import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import useTimeSet from "../../hooks/useTimeSet";


const Post = ({post}) => {
    const navigate = useNavigate()    
    
    const [postImg, setPostImg] = useState(post.postPicture)

    useEffect(()=> {
      if (postImg === null || postImg === undefined) {
        setPostImg("https://placeimg.com/1000/1000/nature")
      }
    },[])
    
    return (
        <PostBox>
            <ImgBox onClick={()=>navigate(`/post/${post.postId}`)}>
                <PostPic src={postImg} alt={post.id} />
                {/* <PostPic src="https://placeimg.com/1000/1000/nature" alt={post.postId} /> */}
            </ImgBox>
            <PostCtn>
                <PostHeader>
                    <Box>
                        <FontSize12>@{post.nickname}</FontSize12>
                        <Time>{useTimeSet(post.createdAt)}</Time>
                    </Box>
                    <Box>
                        <FaRegHeart
                            color="tomato"
                            strokeWidth={1}
                        />
                        <FontSize12>{post.totalLike}</FontSize12>
                    </Box>
                </PostHeader>
                <PostTitle>{post.title}</PostTitle>
            </PostCtn>
        </PostBox>
    )
}

const PostBox = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  box-sizing: border-box;
  margin: 0 10px;
  width: 30%;
  margin-bottom: 30px;
  position: relative;
  box-shadow: 0px 3px 7px 3px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 800px) {
    width: 45%;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
    width: 100%;
  }
`;
const ImgBox = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  background-color: black;
`;
const PostPic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all, 0.3s;
  margin-left: 15px;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  &:hover {
    margin-left: 0;
    opacity: 0.5;
    cursor: pointer;
  }
`;

const PostCtn = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Box = styled.div`
  display: flex;
  gap: 5px;
`;
const FontSize12 = styled.p`
  font-size: 12px;
`;
const Time = styled.p`
  font-size: 12px;
  color: #bfbfbf;
`;
const PostTitle = styled.h3`
  font-size: 16px;
`;

export default Post;

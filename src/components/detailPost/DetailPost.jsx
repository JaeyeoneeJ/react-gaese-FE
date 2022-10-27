import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegHeart, FaHeart, FaRegCommentDots } from "react-icons/fa";
import { __getPost } from "../../redux/modules/dbPostsSlice";
import useTimeSet from "../../hooks/useTimeSet";
import {
  clearPost,
  __addComment,
  __deletePost,
} from "../../redux/modules/postSlice";
import { useCookies } from "react-cookie";
import usePost from "../../hooks/usePost";
import Button from "../elements/Button"
import CommentsList from "../commentsListJJY/CommentsList";

const DetailPost = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [comment, setComment] = useState("");
  const [update, onChangeHandler] = usePost("");
  const { post } = useSelector((state) => state.posts);
  const { isSuccess } = useSelector((state) => state.post);
  const { loginUser } = useSelector((state) => state.dbUser);
  const { edit, setEdit } = useState(false);
  // const [postImg, setPostImg] = useState(post?.postPicture)
  // console.log(postImg)
  // 현재 포스트의 id
  const { id } = useParams();
  // console.log(id);
  // console.log(post);
  // console.log(loginUser);
  // console.log(loginUser?.userInfo?.id);
  // console.log(post?.id);
  const postId = post.postId;
  const cookie = cookies.token;
  
  const [isToggle, setIsToggle] = useState(false)
  const onClickPostDelete = () => {
    if (post?.postId === parseInt(id)) {
      window.confirm("포스트를 정말 삭제하겠습니까?") &&
        dispatch(__deletePost({ postId, cookie }));
    }
  };
  const onClickPostEdit = () => {
    if (post?.postId === parseInt(id)) {
      window.confirm("포스트를 수정하시겠습니까?") && dispatch();
    }
  };

  const onClickCommentAdd = () => {
    dispatch(
      __addComment({
        postId: post.postId,
        comment: comment,
        token: cookies.token,
      })
    );
  };

  // useEffect(()=> {
  //     if (postImg === null || postImg === undefined) {
  //       setPostImg("https://placeimg.com/1000/1000/nature")
  //   }
  //   },[])
  
  useEffect(() => {
    if (isSuccess === true) {
      alert("포스트가 삭제 되었습니다.");
      dispatch(clearPost());
      return navigate("/");
    }
  }, [isSuccess]);
  // console.log(isToggle)
  
  // 삭제 후에도 다시 데이터를 불러오지 않게 하기 위해 useEffect를 분리함
  useEffect(()=> {
    dispatch(__getPost(id));
  },[])

  return (
    <Padding>
      <Ctn>
        <PostBox>
          <BoxHeader>
            <Box>
              <UserPic
                onClick={() => navigate(`/profile/${post.userId}`)}
                // src={post.userPic}
                src="https://placeimg.com/100/100/person"
                alt="userProfile"
              />
              <FontSize16>@{post.nickname}</FontSize16>
              <Time>{useTimeSet(post.createdAt)}</Time>
            </Box>
            <Box>
              {loginUser?.userInfo?.id === post?.id ? (
                <Box>
                  <Button
                    onClick={() => onClickPostDelete(id)}
                    color="tomato"
                    border="none"
                    width="auto"
                    padding="0"
                  >
                    삭제
                  </Button>
                  |
                  <Button
                    onClick={() => setEdit(true)}
                    color="#AF93FF"
                    border="none"
                    width="auto"
                    padding="0"
                  >
                    수정
                  </Button>
                </Box>
              ) : null}
            </Box>
          </BoxHeader>
          {/* <PostPic src={post.postPicture} alt={post.id} /> */}
          <PostPic src={post?.postPicture} alt="Post's Picture" />
          {edit ? (
            <>
              <PostCtn>
                <PostHeader>
                  <PostTitle>
                    <textarea
                      name="memo"
                      maxLength={200}
                      onChange={onChangeHandler}
                    >
                      <h2>{post.title}</h2>
                    </textarea>
                  </PostTitle>
                  <Box>
                    <div onClick={()=>setIsToggle(!isToggle)}>
                      {isToggle ?
                        <FaHeart color="tomato" /> :
                        <FaRegHeart color="tomato" strokeWidth={1} />
                      }
                    </div>
                    <FontSize16>
                      {/* {post.totalLike} */}
                      {"0"}
                    </FontSize16>
                  </Box>
                </PostHeader>
                <PostContent>
                  <textarea
                    name="memo"
                    maxLength={200}
                    onChange={onChangeHandler}
                  >
                    <h2>{post.content}</h2>
                  </textarea>
                </PostContent>
              </PostCtn>
            </>
          ) : (
            <>
              <PostCtn>
                <PostHeader>
                  <PostTitle>{post.title}</PostTitle>
                  <Box>
                    <DivHover onClick={()=>setIsToggle(!isToggle)}>
                      {isToggle ?
                        <FaHeart color="tomato" /> :
                        <FaRegHeart color="tomato" strokeWidth={1} />
                      }
                    </DivHover>
                    <FontSize16>
                      {/* {post.totalLike} */}
                      {"0"}
                    </FontSize16>
                  </Box>
                </PostHeader>
                <PostContent>{post.content}</PostContent>
              </PostCtn>
            </>
          )}
        </PostBox>
      </Ctn>
      <CommentCtn>
        <CommentName  onClick={() => setIsOn(!isOn)}>
          <FaRegCommentDots size={24} /> 댓글 보기
        </CommentName>
        {isOn && (
          <CommentsList postId={postId} cookie={cookie} isOn={isOn} setIsOn={setIsOn}/>
        )}
      </CommentCtn>
    </Padding>
  );
};

const Padding = styled.div`
  padding: 20px;
  margin: 0px auto 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Ctn = styled.div`
    margin-top: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PostBox = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-sizing: border-box;
  width: 70%;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 0px 3px 7px 3px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 800px) {
    width: 80%;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
    width: 100%;
  }
`;
const BoxHeader = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;
const PostPic = styled.img`
  width: 100%;
  transition: all, 0.3s;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const PostCtn = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PostContent = styled.div`
  white-space: pre-wrap;
`;
const Box = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: #d9d9d9;
  & > svg:hover {
    cursor: pointer;
  }
`;

const Time = styled.p`
  font-size: 12px;
  color: #bfbfbf;
`;
const PostTitle = styled.h3`
  font-size: 20px;
`;
const UserPic = styled.img`
  width: 40px;
  border-radius: 30px;
  border: 2px solid white;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
  &:hover {
    cursor: pointer;
  }
`;
const FontSize16 = styled.p`
  color: black;
  font-size: 16px;
`;

const CommentCtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-sizing: border-box;
  width: 70%;
  padding: 10px 20px;
  /* position: relative; */
  box-shadow: 0px 3px 7px 3px rgba(0, 0, 0, 0.2);
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 800px) {
    width: 80%;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
    width: 100%;
  }
`;

const CommentName = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;
const DivHover = styled.div`
  &:hover {
    cursor: pointer;
  }
`

export default DetailPost;

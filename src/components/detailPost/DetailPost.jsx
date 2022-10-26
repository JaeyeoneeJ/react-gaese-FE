import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { __getPost } from "../../redux/modules/dbPostsSlice";
import useTimeSet from "../../hooks/useTimeSet";

const DetailPost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOn, setIsOn] = useState(false)

    const { post } = useSelector((state) => state.posts)

    // 현재 포스트의 id
    const { id } = useParams()
    console.log(id)



    console.log(post)
    useEffect(() => {
        dispatch(__getPost({id}))
    }, [])

    return (
        <Padding>
            <Ctn>
                <PostBox>
                    <BoxHeader>
                        <Box>
                            <UserPic
                                onClick={()=>navigate(`/profile/${post.userId}`)}
                                // src={post.userPic}
                                src="https://placeimg.com/100/100/person"
                                alt="userProfile"
                            />
                            <FontSize16>@{post.nickname}</FontSize16>
                        </Box>
                        <Box>
                            <Time>{useTimeSet(post.createdAt)}</Time>
                        </Box>
                    </BoxHeader>
                    {/* <PostPic src={post.postPicture} alt={post.id} /> */}
                    <PostPic src="https://placeimg.com/1000/1000/nature" alt="Post's Picture" />
                    <PostCtn>
                        <PostHeader>
                            <PostTitle>{post.title}</PostTitle>
                            <Box>
                                <FaRegHeart
                                    color="tomato"
                                    strokeWidth={1}
                                />
                                <FontSize16>
                                    {/* {post.totalLike} */}
                                    {"0"}
                                </FontSize16>
                            </Box>
                        </PostHeader>
                        <PostContent>
                            {post.content}
                        </PostContent>
                    </PostCtn>
                </PostBox>
                <CommentCtn onClick={()=>setIsOn(!isOn)}>
                    <CommentName>
                        <FaRegCommentDots size={24} /> 댓글 보기
                    </CommentName>
                    {isOn && 
                        <CommentBox>
                            <DummyBox>Comment Area</DummyBox>
                        </CommentBox>
                    }
                </CommentCtn>
            </Ctn>
        </Padding>
    )
}

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PostBox = styled.div`
    border: 1px solid #D9D9D9;
    border-radius: 10px;
    box-sizing: border-box;
    width: 70%;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 3px 7px 3px rgba(0,0,0,0.2);
    @media screen and (max-width:800px) {
        width: 80%;
    }
    @media screen and (max-width:500px) {
        min-width: 200px;
        width: 100%;
    }
`
const BoxHeader = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`
const PostPic = styled.img`
    width: 100%;
    transition: all, 0.3s;
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`

const PostCtn = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const PostContent = styled.div`
    white-space: pre-wrap;
`
const Box = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const Time = styled.p`
    font-size: 12px;
    color: #BFBFBF;
`
const PostTitle = styled.h3`
    font-size: 20px;
`
const UserPic = styled.img`
    width: 40px;
    border-radius: 30px;
    border: 2px solid white;
    box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.2);
    &:hover {
        cursor: pointer;
    }
`
const FontSize16 = styled.p`
    font-size: 16px;
`

const CommentCtn = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #D9D9D9;
    border-radius: 10px;
    box-sizing: border-box;
    width: 70%;
    padding: 10px 20px;
    position: relative;
    box-shadow: 0px 3px 7px 3px rgba(0,0,0,0.2);
    &:hover{
        cursor: pointer;
    }
    @media screen and (max-width:800px) {
        width: 80%;
    }
    @media screen and (max-width:500px) {
        min-width: 200px;
        width: 100%;
    }
`
const CommentBox = styled.div`
    border-top: 2px solid #d9d9d9;
    width: 100%;
`
const CommentName = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
`
const DummyBox = styled.div`
    padding: 10px 0;
`

export default DetailPost
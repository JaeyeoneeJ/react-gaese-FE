import { VscEdit, VscTrash } from "react-icons/vsc"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { __deleteComment, __editComment, __getComments } from "../../redux/modules/commentsSlice"
import useTimeSet from "../../hooks/useTimeSet"


const Comment = ({comment, postId, cookie}) => {
    const dispatch = useDispatch()
    
    const { loginUser } = useSelector((state) => state.dbUser);
    // console.log(comment)
    // console.log(comment)
    // const [isEdit, setIsEdit] = useState(false)
    // const [editComment, setEditComment] = useState(comment.comment)
    // const [prevComment, setPrevComment] = useState(editComment)

    // const onChangeEditComment = (e) => {
    //     setEditComment(e.target.value)
    // }

    // const isEditChange = () => {
    //     isEdit ? setEditComment(prevComment) : setEditComment(editComment)
    //     setPrevComment(editComment)
    //     setIsEdit(!isEdit)
    // }
    // const onCompleteEditComment = (id, comment) => {
    //     dispatch(__editComment({id, comment}))
    //     setIsEdit(!isEdit)
    // }
    
    const onDeleteComment = () => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            dispatch(__deleteComment({commentId:comment.commentId, cookie, postId}))
            alert('삭제가 완료되었습니다.')
            return window.location.replace(postId)
        }
    }

    return (
         <>
                    <CommentBox key={comment.id}>
                        <CommentViewBox>
                            <Box>
                                <CommentsNickname>@{comment.nickname}</CommentsNickname>
                                <Time>{useTimeSet(comment.createdAt)}</Time>
                            </Box>
                            <CommentsContent>{comment.comment}</CommentsContent>
                        </CommentViewBox>
                        <CommentEditBox>
                        {(loginUser?.userInfo?.nickname === comment?.nickname) ? (
                            <>
                                <CommentIcon
                                    color="#1a73e8"
                                    // onClick={()=>isEditChange()}
                                >
                                    <VscEdit
                                        size={20}
                                        color="white"
                                    />
                                </CommentIcon>
                                <CommentIcon
                                    onClick={()=>onDeleteComment()}
                                    color="tomato"
                                >
                                    <VscTrash
                                        size={20}
                                        color="white"
                                    />
                                </CommentIcon>
                            </>) : null}
                        </CommentEditBox>
                    </CommentBox>

        </>
    )
}

const CommentBox = styled.div`
    display: flex;
    gap: 10px;
    color: black;
    width: 100%;
    border-bottom: 1px solid #ddd;
`
const CommentViewBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    gap: 10px;
    color: black;
    width: 100%;
`
const CommentsNickname = styled.p`
    font-size: 14px;
`
const CommentsContent = styled.p`
    font-size: 18px;
`
const CommentEditBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const CommentIcon = styled.div`
    border-radius: 10px;
    font-size: 12px;
    color: white;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.color};
    &:hover {
        cursor: pointer;
    }
`
// const EditCommentInput = styled.input`
//     width: 100%;
//     border: 1px solid #ddd;
//     border-radius: 10px;
//     padding: 0 12px;
//     height: 30px;
//     font-size: 12px;
// `
const Box = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const Time = styled.div`
    color: #bfbfbf;
    font-size: 12px;
`

export default Comment
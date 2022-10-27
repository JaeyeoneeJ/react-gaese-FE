import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import useInput from "../../hooks/useInput"
import { __addComment, __getComments } from "../../redux/modules/commentsSlice"
import Comment from "../comment/Comment"

const CommentsList = ({postId, cookie, setIsOn, isOn}) => {
    const dispatch = useDispatch()
    const {id} = useParams()

    const {comments} = useSelector((state)=> state.comments)
    
    const realComments = comments.data
    // console.log(cookie, postId)
    
    const [postComment, onChangeCommentHandler, resetComment] = useInput();
    
    const onSubmitAddComment = (e) => {
        e.preventDefault();
        const objectComment = {
            comment: postComment
        }
        dispatch(__addComment({objectComment, postId, cookie}))
        resetComment()
        setIsOn(true)
        return window.location.replace(postId)
        
        
    }

    
    useEffect(() => {
        dispatch(__getComments(postId))
    }, [])

    return (
        <CommentsListCtn>
            <Footer>
                <AddCommentForm onSubmit={onSubmitAddComment}>
                    <AddCommentContent
                        type="text"
                        name="comment"
                        value={postComment}
                        onChange={onChangeCommentHandler}
                        placeholder="댓글을 입력해주세요. (100자 이내)"
                        maxLength="100"
                        required
                    />
                    <AddCommentBtn>추가하기</AddCommentBtn>
                </AddCommentForm>
                <CommentsCtn>
                    {realComments?.map((comment)=> (
                        <Comment
                            key={comment.commentId}
                            cookie={cookie}
                            postId={postId}
                            comment={comment}
                        />
                    ))}
                </CommentsCtn>
            </Footer>
        </CommentsListCtn>
    )
}
const CommentsListCtn = styled.div`
    width: 100%;
    border: 1px solid red;
`
const Footer = styled.div`
    border-top: 1px solid #ddd;
    background-color: white;
    color: gray;
    width: 100%;
    font-size: 2em;
    transition: all, 0.3s;
    box-sizing: border-box;
    border-top: 1px solid #d9d9d9;
`
const AddCommentForm = styled.form`
    display: flex;
    gap: 10px;
    border-top: 1px solid #ddd;
    width: 100%;
    padding-top: 10px;
    color: #ddd;
`
const AddCommentContent = styled.input`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 0 12px;
    height: 40px;
    font-size: 14px;
`
const AddCommentBtn = styled.button`
    background-color: transparent;
    border: 2px solid #1a73e8;
    color: #1a73e8;
    font-weight: 700;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    padding: 10px;
    transition: all, 0.3s;
    &:hover {
        cursor: pointer;
        background-color: #1a73e8;
        color: white;
    }
`
const CommentsCtn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`

export default CommentsList
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import usePost from "../../hooks/usePost";
import Button from "../elements/Button";
import { FaImage } from "react-icons/fa";
import { __addPost, __getPost } from "../../redux/modules/postSlice";
import { useDropzone } from "react-dropzone";

const AddPost = () => {
  const post = useSelector((state) => state.post);
  const navigate = useNavigate();
  const [value, onChangeHandler, resetValue] = usePost();
  const dispatch = useDispatch();
  const formData = new FormData();
  const [imageSrc, setImageSrc] = useState("");
  const [postPicture, setPostPicture] = useState([]);
  const [isup, setIsup] = useState(false);
  //Dropzone 로직
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    setPostPicture(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    setIsup(true);
  }, []);
  console.log(postPicture);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        console.log(reader);
        resolve();
      };
    });
  };

  //파일 이미지 업로드 핸들러
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", postPicture[0]);
    formData.append("postTitle", value.postTitle);
    formData.append("postContent", value.postContent);
    for (const key of formData.entries()) {
      console.log(key);
    }

    if (value.postTitle.trim() === "" || value.postContent.trim() === "") {
      return;
    }

    dispatch(__addPost(formData));

    if (
      window.confirm(
        `Post가 정상적으로 업로드 되었습니다.\n리스트에서 확인 하시겠습니까?`
      )
    ) {
      navigate(`/post`);
    } else {
      resetValue();
    }
  };

  useEffect(() => {
    dispatch(__getPost());
  }, []);

  const thumb = postPicture?.map((file) => {
    return (
      <img
        style={{ width: "200px", height: "200px" }}
        src={file.preview}
        alt="preview-img"
      />
    );
  });
  return (
    <Padding onSubmit={onSubmitHandler}>
      <AddPostBox>
        <AddPostHeader>새 포스트 만들기</AddPostHeader>
        <AddPostPicBox {...getRootProps()}>
          <input
            value={value.postPicture}
            accept="image/*"
            onChange={(e) => encodeFileToBase64(e.target.files[0])}
            type="file"
            {...getInputProps()}
          />
          {isDragActive ? (
            <h3>파일이 업로드 완료</h3>
          ) : (
            <h3>사진과 동영상을 여기에 끌어다 놓으세요.</h3>
          )}
          {isup ? (
            <div className="preview">{thumb}</div>
          ) : (
            <FaImage size={80} color="#d9d9d9" />
          )}

          <Button width="120px" bgColor="#78A6FF" border="none" color="white">
            사진 선택하기
          </Button>
        </AddPostPicBox>

        <AddTodoCtn>
          <AddTodoCtnArea>
            <AddTodoBox>
              <AddTodoTitle>제목</AddTodoTitle>
              <AddTodoInput
                type="text"
                name="postTitle"
                value={value.postTitle}
                onChange={onChangeHandler}
                placeholder="제목을 입력해주세요. (50자 이내)"
                maxLength="50"
                required
              />
            </AddTodoBox>
            <AddTodoBox>
              <AddTodoTitle>내용</AddTodoTitle>
              <AddTodoTextarea
                type="text"
                name="postContent"
                value={value.postContent}
                onChange={onChangeHandler}
                placeholder="내용을 입력해주세요. (200자 이내)"
                maxLength="200"
                rows="5"
                required
              />
            </AddTodoBox>
          </AddTodoCtnArea>
          <AddTodoBtn>추가하기</AddTodoBtn>
        </AddTodoCtn>
      </AddPostBox>
    </Padding>
  );
};

const Padding = styled.div`
  margin: 0 auto;
  padding: 20px;
`;
const AddPostBox = styled.div`
  margin: 30px auto 0 auto;
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  max-width: 600px;
  box-shadow: 5px 9px 10px 0px rgba(0, 0, 0, 0.2);
`;
const AddPostHeader = styled.div`
  padding: 10px;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid #d9d9d9;
`;

const AddPostPicBox = styled.div`
  padding: 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

const AddTodoCtn = styled.form`
  margin: 20px auto 0 auto;
  max-width: 500px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  @media screen and (max-height: 632px) {
    height: auto;
    overflow: visible;
  }
`;
const AddTodoCtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  height: 100%;
`;

const AddTodoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const AddTodoTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;
const AddTodoInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 12px;
  height: 46px;
  font-size: 14px;
`;

const AddTodoTextarea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  min-height: 120px;
  font-size: 14px;
`;

const AddTodoBtn = styled.button`
  background-color: transparent;
  border: 2px solid #1a73e8;
  color: #1a73e8;
  font-weight: 700;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  transition: all, 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #1a73e8;
    color: white;
  }
`;

export default AddPost;

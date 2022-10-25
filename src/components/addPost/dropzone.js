import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";
import AddPost from "./AddPost";

const ImgDropzone = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [isup, setIsup] = useState(false);
  const [postPicture, setPostPicture] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setPostPicture(acceptedFiles[0])
      .then((json) => onChange(json.url))
      .finally(() => setLoading(false));
    setIsup(true);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <Dropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {value ? (
        <img src={value} />
      ) : loading ? (
        <FaSpinner variant="standard" animation="border" role="status" />
      ) : (
        <span>Drag 'n' drop some files here, or click to select files</span>
      )}
      <AddPost
        postPicture={postPicture}
        isup={isup}
        setPostPicture={setPostPicture}
      />
    </Dropzone>
  );
};
export default ImgDropzone;

const Dropzone = styled.div`
  border: 1px dashed #ced4d9;
  border-radius: 5px;
  color: #ced4d9;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 142px;
  img {
    height: 140px;
  }
`;

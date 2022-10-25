import React, { useCallback, useState } from "react";

const usePost = () => {
  //value 는 state 관리!
  const [post, setPost] = useState({
    postPicture: "사진으로 대체 될 예정",
    postTitle: "",
    postContent: "",
  });

  //핸들러 로직
  const handler = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const reset = useCallback(() => setPost(""));

  return [post, handler, reset];
};

export default usePost;

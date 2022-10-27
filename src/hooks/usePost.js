import React, { useCallback, useState } from "react";

const usePost = () => {
  //value 는 state 관리!
  const [post, setPost] = useState({
    postPicture: [],
    title: "",
    content: "",
  });

  //핸들러 로직
  const handler = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const postHadler = (e) => {
    const { name, files } = e.target;
    setPost({ ...post, [name]: files });
  };
  const reset = useCallback(() => setPost(""));

  return [post, handler, postHadler, reset];
};

export default usePost;

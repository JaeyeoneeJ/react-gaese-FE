import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  // baseURL: "http://3.34.143.16/",
  baseURL: "http://localhost:4000",
});

export const UserApi = {
  getUser: (id) => instance.get(`/users/${id}`),
  postSign: (payload) => instance.post("/users/signup", payload),
  postLogin: (payload) => instance.post("/users/login", payload),
};

export const PostsApi = {
  getGaese: () => instance.get("/post/list"),
  getDetailGaese: (postId) => instance.get(`/post/${postId}`),
  postGaese: (payload) =>
    instance.post("/posts/write", payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: payload.cookies.token,
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteGaese: (payload) =>
    instance.delete(`/posts/${payload.postId}`, {
      headers: {
        Authorization: payload.cookie,
      },
    }),
  patchGaese: (postId, edit) =>
    instance.patch(`/posts/${postId}`, { postComment: edit }),
};
export const CommentsApi = {
  getComments: (postId) => instance.get(`/comments/${postId}`),
  getDetailGaese: (postId) => instance.get(`/post/${postId}`),
  postComments: (payload) =>
    instance.post(`/comments/${payload.postId}`, payload.comment, {
      headers: {
        Authorization: payload.token,
      },
    }),

  deleteComments: (postId, cmtId) =>
    instance.delete(`/comments/${postId}/${cmtId}`),
  patchComments: (postId, cmtId, edit) =>
    instance.patch(`/comments/${postId}/${cmtId}`, { comment: edit }),
};
export const LikesApi = {
  getLikes: () => instance.get("/posts/like"),
  patchLikes: (postId, edit) =>
    instance.patch(`/posts/${postId}/like`, { like: false }),
};

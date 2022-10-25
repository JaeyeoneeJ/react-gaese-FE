import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export const UserApi = {
  getUser: (id) => instance.get(`/users/${id}`),
  postSign: (payload) => instance.post("/users/signup", payload),
  postLogin: (payload) => instance.post("/users/login", payload),
};

export const PostsApi = {
  getGaese: () => instance.get("/post/list"),
  getDetailGaese: (postId) => instance.get(`/post/${postId}`),
  postGaese: (payload) => instance.post("/posts/write", payload),
  deleteGaesel: (postId) => instance.delete(`/post/${postId}`),
  patchGaese: (postId, edit) =>
    instance.patch(`/posts/${postId}`, { postComment: edit }),
};
export const CommentsApi = {
  getComments: (postId) => instance.get(`/comments/${postId}`),
  getDetailGaese: (postId) => instance.get(`/post/${postId}`),
  postComments: (postId, payload) =>
    instance.post(`/comments/${postId}`, payload),
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

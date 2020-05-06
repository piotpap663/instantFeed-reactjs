import axios from 'axios';

import {
  ENDPOINT_ADD_POST,
  ENDPOINT_GET_ALL_POSTS_EXCEPT_USER,
  ENDPOINT_GET_POSTS,
  ENDPOINT_GET_USER_POSTS,
  ENDPOINT_GET_USER_SUBSCRIBERS,
  ENDPOINT_LIKE,
  ENDPOINT_LOGOUT,
  ENDPOINT_SUBSCRIBE_USER,
  ENDPOINT_UNSUBSCRIBE_USER,
  ENPOINT_REMOVE_POST,
} from '../../config';

export const getPostsByUserId = (subscribers, userId) => axios.get(ENDPOINT_GET_POSTS, {
  params: {
    subscribers: [...subscribers, userId],
    userId
  }
});
export const getAllPostsExceptUser = (subscribers, userId) => axios.get(ENDPOINT_GET_ALL_POSTS_EXCEPT_USER, {
  params: {
    userId
  }
});
export const removePostById = (postId) => axios.post(ENPOINT_REMOVE_POST, {
  params: {
    postId
  }
});
export const getUserSubscribers = (userId) => axios.get(ENDPOINT_GET_USER_SUBSCRIBERS, {
  params: {
    userId
  }
});
export const logoutUser = () => axios.get(ENDPOINT_LOGOUT);
export const loginUser = (user, password) => axios.post('http://localhost:3000/api/login', {
  user,
  password
});
export const registerUser = (user, password) => axios.post('http://localhost:3000/api/addUser', {
  user,
  password
});
export const likePost = (userId, id) => axios.post(ENDPOINT_LIKE, {
  params: {
    userId,
    postId: id
  }
})
export const getUserPostSubscribersPostLikedBySubscribersPost = (subscribers, userId) => {
  return axios.get(ENDPOINT_GET_POSTS, {
    params: {
      subscribers: [...subscribers, userId],
      userId: userId
    }
  })
}
export const getUserPosts = (subscribers, userId, visitedUserId) => {
  return axios.get(ENDPOINT_GET_USER_POSTS, {
    params: {
      userId: visitedUserId
    }
  })
}
export const unsubscribeUser = (postAuthorId, userId) => {
  return axios.post(ENDPOINT_UNSUBSCRIBE_USER, {
    params: {
      subscriber: postAuthorId,
      authorId: userId
    }
  })
}
export const subscribeUser = (postAuthorId, userId) => {
  return axios.post(ENDPOINT_SUBSCRIBE_USER, {
    params: {
      subscriber: postAuthorId,
      authorId: userId
    }
  })
}
export const addPost = (data) => {
  const config = {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    },
  };
  return axios.post(ENDPOINT_ADD_POST, data, config)
}


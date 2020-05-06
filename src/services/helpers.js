const getLikedPosts = (posts, postId, userId) => {
  return posts.map(post => {
    let likes = [...post.likes];
    if (post._id === postId) {
      const isLiked = post.likes.includes(userId);
      if (isLiked) {
        likes = likes.filter(likeId => likeId !== userId);
      } else {
        likes = [...likes, userId];
      }
    }
    return {
      ...post,
      likes
    };
  });
};

export {
  getLikedPosts
}
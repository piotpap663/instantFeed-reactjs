import React from 'react';
import { connect } from 'react-redux';

import { setPosts } from '../../../actions/posts';
import { likePost } from '../../../services/api';
import { getLikedPosts } from '../../../services/helpers';
import styles from './PostInfo.module.scss';

const PostInfo = ({ _id, likes = [], userId, comments = [], posts, setPosts, post_created_at = '' }) => {

  const isLikedByMe = () => {
    return likes.includes(userId);
  }

  const clickLike = (e, _id) => {
    likePost(userId, _id).then((response) => {
      if (response.status !== 200) {
        console.error(response);
      } else {
        const oldPosts = [...posts];
        const newPosts = getLikedPosts(oldPosts, _id, userId);
        setPosts(newPosts);
      }
    }).catch((error) => {
      console.error(error);
    })
  }
  return (
    <div className={styles.postInfo}>
      <div className={styles.icons}>
        <div>
          <button onClick={(e) => { clickLike(e, _id) }} className={`${styles.likeButton} ${isLikedByMe() ? styles.liked : ''}`} >
            {isLikedByMe() ? "Lubisz to" : "Lubię to!"}
          </button>
        </div>
      </div>
      <div className={styles.likes}>Liczba polubień: {likes.length}</div>
      <div className={styles.info}>
        <div className={styles.timestamp}>
          Dodano: {new Date(post_created_at).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    posts: state.posts,
  };
}
const mapDispatchToProps = dispatch => ({
  setPosts: (posts) => dispatch(setPosts(posts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostInfo);
import React from 'react';
import { connect } from 'react-redux';

import { setPosts } from '../../../../actions/posts';
import { removePostById } from '../../../../services/api';
import styles from './PostHeaderRemove.module.scss';

const PostHeaderRemove = ({ post_id, posts, setPosts }) => {


  const removePost = (_id) => {
    removePostById(_id).then((response) => {
      if (response.status !== 200) {
        console.error(response);
        alert("Something went wrong");
      } else {
        const newPosts = posts.filter(post => post._id !== _id);
        setPosts(newPosts)
      }
    }).catch((error) => {
      console.error(error);
    })
  }
  return (
    <div className={styles.remove}>
      <div onClick={e => { removePost(post_id); }}>
        <button className={styles.clickRemove}>Usuń</button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
}
const mapDispatchToProps = dispatch => ({
  setPosts: (posts) => dispatch(setPosts(posts))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeaderRemove);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setSubscribers } from '../../../actions/auth';
import { setPosts } from '../../../actions/posts';
import defaultAvatar from '../../../resources/icons/avatar.webp';
import { removePostById, subscribeUser, unsubscribeUser } from '../../../services/api';
import styles from './PostHeader.module.scss';
import PostHeaderRemove from './PostHeaderRemove/PostHeaderRemove';

class PostHeader extends Component {

  clickUnSubscribeUser(postAuthorId, userId) {
    unsubscribeUser(postAuthorId, userId).then((response) => {
      if (response.status !== 200) {
        console.error(response);
        alert("Something went wrong");
      }
      const subscribers = this.props.subscribers.filter(subId => subId !== postAuthorId);
      this.props.setSubscribers(subscribers);
    }).catch(function (error) {
      console.error(error);
    })
  }

  clickSubscribeUser(postAuthorId, userId) {
    subscribeUser(postAuthorId, userId).then((response) => {
      if (response.status !== 200) {
        console.error(response);
        alert("Something went wrong");
      }
      const subscribers = [...this.props.subscribers, postAuthorId];
      this.props.setSubscribers(subscribers);
    }).catch(function (error) {
      console.error(error);
    })
  }

  removePost = (_id) => {
    removePostById(_id).then((response) => {
      if (response.status !== 200) {
        console.error(response);
        alert("Something went wrong");
      } else {
        const posts = this.props.posts.filter(post => post._id !== _id);
        this.props.setPosts(posts)
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    const {
      subscribers,
      userId,
      post_id,
      post_user,
      post_authorId
    } = this.props;
    return (
      <div className={styles.header}>
        <Link to={`/user/${post_authorId}`}>
          <img className={styles.headerLogo} src={post_user.avatar || defaultAvatar} alt="" />
          <span className={styles.author}>
            {post_user.user}
          </span>
        </Link>
        {post_authorId === userId ? (
          <PostHeaderRemove post_id={post_id} />) :
          subscribers.includes(post_authorId) ? (
            <div className={styles.unSubscribeUser}>
              <button onClick={(e) => { this.clickUnSubscribeUser(post_authorId, userId) }}>{"Subskrybujesz"}</button>
            </div>) : (
              <div className={styles.subscribeUser}>
                <button onClick={(e) => { this.clickSubscribeUser(post_authorId, userId) }}>{"Subskrybuj"}</button>
              </div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    subscribers: state.auth.subscribers,
  };
}
const mapDispatchToProps = dispatch => ({
  setSubscribers: (subscribers) => dispatch(setSubscribers(subscribers)),
  setPosts: (posts) => dispatch(setPosts(posts))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeader);
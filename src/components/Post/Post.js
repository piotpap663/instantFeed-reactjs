import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Post.module.scss';
import PostContent from './PostContent/PostContent';
import PostHeader from './PostHeader/PostHeader';
import PostInfo from './PostInfo/PostInfo';

class Post extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { DATA } = this.props;
    const {
      _id = '',
      user = '',
      created_at = '',
      text = '',
      images = '',
      authorId = '',
      likes = ''
    } = DATA;
    return DATA && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <PostHeader
            post_id={_id}
            post_user={user}
            post_authorId={authorId}
          />
          <PostContent
            text={text}
            images={images}
          />
          <PostInfo
            _id={_id}
            likes={likes}
            authorId={authorId}
            post_created_at={created_at}
          />
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    userId: state.auth.id,
  };
}

export default connect(
  mapStateToProps
)(Post);
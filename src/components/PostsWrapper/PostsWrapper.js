import React, { Component } from 'react';
import styles from './PostsWrapper.module.scss';

class PostsWrapper extends Component {
  render() {
    return <div className={styles.wrapper}>{this.props.children}</div>;
  }
}

PostsWrapper.propTypes = {};

export default PostsWrapper;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPosts } from '../../actions/posts';
import Post from '../Post/Post';
import PostsWrapper from '../PostsWrapper/PostsWrapper';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (this.props.userId) {
      this.props.getPosts(this.props.subscribers, this.props.userId, this.props.match.params && this.props.match.params.id)
        .then((response) => {
          if (response.status !== 200) {
            console.error(response);
            alert("Something went wrong");
          }
          const posts = response.data;
          this.props.setPosts(posts)
        }).catch(function (error) {
          console.error(error);
        })
    }
  }

  render() {
    const { subscribers, posts } = this.props;
    return (
      <div>
        {this.state.isLoading && "Loading..."}
        {!this.state.isLoading && (
          <PostsWrapper>
            {posts && posts.length ? posts.map((post, index) =>
              <Post
                key={index}
                DATA={post}
                subscribers={subscribers}
              />) : null}
          </PostsWrapper>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    subscribers: state.auth.subscribers,
    posts: state.posts
  };
}
const mapDispatchToProps = dispatch => ({
  setPosts: (posts) => dispatch(setPosts(posts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { Router, Switch } from 'react-router-dom';

import AddPost from '../components/AddPost/AddPost';
import DashboardPage from '../components/DashboardPage/DashboardPage';
import EntryPage from '../components/EntryPage/EntryPage';
import { getAllPostsExceptUser, getUserPosts, getUserPostSubscribersPostLikedBySubscribersPost } from '../services/api';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/login" component={EntryPage} />
        <PrivateRoute
          path="/"
          exact={true}
          component={(props) =>
            <DashboardPage
              {...props}
              getPosts={getUserPostSubscribersPostLikedBySubscribersPost}
            />}
        />
        <PrivateRoute path="/addPost" component={AddPost} />
        <PrivateRoute
          path="/user/:id"
          component={(props) =>
            <DashboardPage
              {...props}
              getPosts={getUserPosts}
            />}
        />
        <PrivateRoute
          path="/explore"
          component={(props) =>
            <DashboardPage
              {...props}
              getPosts={getAllPostsExceptUser}
            />}
        />
        <PublicRoute component={() => "NotFound"} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

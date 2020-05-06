import { combineReducers, compose, createStore } from 'redux';

import authReducer from '../reducers/auth';
import postsReducer from '../reducers/posts';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      posts: postsReducer
      // filters
    }),
    composeEnhancers()
  );

  return store;
};

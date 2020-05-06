//   ----------------------------- START DYNAMIC TESTS ---------------------------
// import './App.scss';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';



// import LoadingPage from './components/LoadingPage';

const store = configureStore();

class App extends Component {
  render() {
    return (<Provider store={store}>
      <AppRouter />
    </Provider>
    );
  }
}

export default App;




// import React, { Component } from 'react';

// import Header from './components/Header/Header';
// import Post from './components/Post/Post';
// import PostsWrapper from './components/PostsWrapper/PostsWrapper';
// import { IMAGES, POSTS } from './services/mock';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       posts: [...IMAGES, ...POSTS]
//     }
//   }


//   render() {
//     const { posts } = this.state;
//     return (
//       <div className="App" id="App">
//         <Header />
//         <PostsWrapper>
//           {posts && posts.map(post => <Post DATA={post} />)}
//         </PostsWrapper>
//         {/* <button onClick={() => { }}>{"ADD POST"}</button> */}
//       </div>
//     );
//   }
// }

// export default App;

//   ----------------------------- END DYNAMIC TESTS ---------------------------


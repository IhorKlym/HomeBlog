// @flow
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

// import * as S from './styles';
import store from './store';

const NewsfeedScreen = () => {
  const { posts, loading } = store;
  const history = useHistory();

  const handleUserClick = (id: string) => {
    history.push(`posts/${id}`)
  }

  useEffect(() => {
    store.fetchNewsfeed();
  }, [])

  return (
    <div>
      {posts.length ? 
        posts.map((post) => {
          return (
            <div key={post.id} onClick={() => handleUserClick(post.id)}>
              <p>
                <strong>{post.title}</strong>
              </p>
              <p>{post.text}</p>
            </div>
          );
        })
      : (
        'No Posts'
      )}
    </div>
  );
};

export default observer(NewsfeedScreen);

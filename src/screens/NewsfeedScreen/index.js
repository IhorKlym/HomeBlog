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
        posts.map((user) => {
          return (
            <div key={user.id} onClick={() => handleUserClick(user.id)}>
              <p>
                <strong>{user.first_name}</strong>
              </p>
              <p>{user.email}</p>
              <img key={user.avatar} src={user.avatar} />
            </div>
          );
        })
      : (
        'No Users'
      )}
    </div>
  );
};

export default observer(NewsfeedScreen);

// @flow
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import store from './store';
// import * as S from './styles';

const PostScreen = () => {
  const { post } = store;
  const history = useHistory();
  const { postId } = useParams();

  const handleDelete = () => {
    store.deletePost();
    history.push('/');
  }

  useEffect(() => {
    store.getPost(postId);
  }, [])

  return (
    <div>
      <div key={post.id}>
        <p>
          <strong>{post.first_name}</strong>
        </p>
        <p>{post.email}</p>
        <img key={post.avatar} src={post.avatar} />
        </div>
        <div onClick={handleDelete}>delete</div>
    </div>
  );
};

export default observer(PostScreen);

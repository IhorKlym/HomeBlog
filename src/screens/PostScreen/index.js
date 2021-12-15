// @flow
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import store from './store';
// import * as S from './styles';

const PostScreen = () => {
  const { post } = store;
  const history = useHistory();
  const { postId } = useParams();
  const [edit, setEdit] = useState(false);

  const handleDelete = () => {
    store.deletePost();
    history.push('/');
  }

  const handleEdit = () => {
    if (edit) {
      store.updatePost();
      setEdit(false);
    } else {
      setEdit(true);
    }
  }

  useEffect(() => {
    store.getPost(postId);
  }, [])

  return (
    <div>
      {edit ?
        <div>
          <input value={post.title} name="title" onChange={store.handleChange}/>
          <input value={post.text} name="text" onChange={store.handleChange} />
        </div>
      : (
        <div key={post.id}>
        <p>
          <strong>{post.title}</strong>
        </p>
        <p>{post.text}</p>
      </div>
      )}
        <div onClick={handleDelete}>delete</div>
        <div onClick={handleEdit}>{edit ? 'Save' : 'Edit'}</div>
    </div>
  );
};

export default observer(PostScreen);

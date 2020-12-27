import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <div className="container">
        {posts.map((post) => (
          <Grid key={post._id}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </div>
    )
  );
};

export default Posts;

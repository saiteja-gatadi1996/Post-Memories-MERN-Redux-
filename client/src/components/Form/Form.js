import React, { useState, useEffect } from 'react';
import {Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import "./Form.css"

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
   const classes = useStyles();

  useEffect(() => {
    if (post) 
    setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <div className="formInput">
            
    <form className="form" onSubmit={handleSubmit}>
        <input className="inputs" placeholder="Creator" value={postData.creator} type="text" onChange={(e)=>setPostData({...postData, creator:e.target.value})}/>

        <input className="inputs" placeholder="title" value={postData.title} type="text" onChange={(e)=>setPostData({...postData, title:e.target.value})}/>

        <input className="inputs" placeholder="message" value={postData.message} type="text" onChange={(e)=>setPostData({...postData, message:e.target.value})}/>

        <input className="inputs" placeholder="tags" value={postData.tags} type="text" onChange={(e)=>setPostData({...postData, tags:e.target.value})}/>

        <div className="file__choose">
        <FileBase type="file" 
        multiple={false}
        onDone={({base64})=>setPostData({...postData, selectedFile: base64})}/>
        </div>
       
        
        <button className="button__submit" type="submit">
            Submit
        </button>
        <button className="button__clear" onClick={clear}>
            Clear
        </button>
    </form>

</div>
)
}

export default Form

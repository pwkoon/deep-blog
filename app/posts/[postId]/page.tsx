"use client";

import PostDetail from '@/components/PostDetail';

const PostId = () => {
     
      const loadSinglePostFromLocalStorage = () => {
        const singlePost = localStorage.getItem('single post');
        return singlePost ? JSON.parse(singlePost) : null;
      };
  
      const singlePost = loadSinglePostFromLocalStorage();

    return (
        <PostDetail post={singlePost} />
    )
}

export default PostId
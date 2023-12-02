"use client";

import { usePostDetail, useToken } from '@/atom';
import PostDetail from '@/components/PostDetail';

const PostId = () => {
    const { postDetail, setPostDetail } = usePostDetail();
    const { token } = useToken();
     
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
"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { usePost, usePostDetail, useSelectedPost, useToken } from '@/atom';
import PostCard from '@/components/PostCard'
import Link from 'next/link';

const Posts = () => {
  const router = useRouter()

  const { posts, setPosts } = usePost();
  const { token } = useToken();
  const { setPostDetail } = usePostDetail();
  const { selectedPost, setSelectedPost } = useSelectedPost();

// STORE ALL POSTS IN LOCAL STORAGE
  useEffect(() => {
    const loadPostsFromLocalStorage = () => {
      const storedPosts = localStorage.getItem('posts');
      return storedPosts ? JSON.parse(storedPosts) : null;
    };

    const fetchAndSetPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts', {
          headers: {
            Authorization: token && token.accessToken ? `Bearer ${token.accessToken}` : '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        localStorage.setItem('posts', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const storedPosts = loadPostsFromLocalStorage();

    if (storedPosts) {
      setPosts(storedPosts);
    } else {
      fetchAndSetPosts();
    }
  }, [setPosts, token]);

// STORE SINGLE POST IN LOCAL STORAGE
  const fetchSinglePost = async () => {
    try {
      const res = await fetch(`http://localhost:4000/posts/${selectedPost}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }

      const postData = await res.json();
      setPostDetail(postData);
      localStorage.setItem('single post', JSON.stringify(postData));
      router.push(`/posts/${selectedPost}`)
    } catch (error) {
      console.error('Error fetching blog post data:', error);
    }
  }

  const handleClick = async (event: any) => {
    setSelectedPost(event.id)
    fetchSinglePost();
  }
  
  return (
    <>
      <div className='grid grid-cols-4 gap-4 p-3'>
        { posts.length ?  
            posts.map((post) =>
              <PostCard key={post.id} post={post} handleClick={handleClick} /> 
            ) :
            <h1>No posts yet...</h1>
        }
        <Link href="/dashboard">Back home</Link>
      </div>
    </>
  )
}

export default Posts

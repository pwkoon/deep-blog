"use client"

import React, { useEffect } from 'react';
import { usePost, useToken, useUser } from '../atom';
import Link from 'next/link';

const Posts = () => {
  const { posts, setPosts } = usePost();
  const { token } = useToken();
  const { user } = useUser();

  // if (typeof window !== 'undefined') {
  //   window.localStorage.setItem("token", JSON.stringify(token))
  // }

  useEffect(() => {
    const setTokenInLocalStorage = () => {
      try {
        if (typeof window !== 'undefined') {
          // const token = { accessToken: 'yourAccessToken' }; // Replace with your actual token
          window.localStorage.setItem('token', JSON.stringify(token));
        }
      } catch (error) {
        console.error('Error setting token in localStorage:', error);
      }
    };
    setTokenInLocalStorage();
  }, [])

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

  return (
    <>
      { posts.length ?     
          posts.map(post => 
            <div className='bg-deep-blue' key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ) :
          <h1>No posts yet...</h1>
      }
      <Link href="/dashboard">Back home</Link>
    </>
  )
}

export default Posts;

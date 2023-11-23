"use client"

import React, { useEffect } from 'react';
import { usePost, useToken } from '../atom';
import Link from 'next/link';

const Posts = () => {
  const { posts, setPosts } = usePost();
  const { token } = useToken();
  
  // STORE TOKEN IN LOCAL STORAGE
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

  return (
    <>
      <div className='h-screen grid grid-cols-4 gap-4 p-3'>
        { posts.length ?     
            posts.map((post, index) =>  
                <div className="p-3 max-w-sm rounded overflow-hidden shadow-lg" key={index}>
                  {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <p className="text-gray-700 text-base">
                      {post.content}
                    </p>
                  </div>
                </div>
            ) :
            <h1>No posts yet...</h1>
        }
      <Link href="/dashboard">Back home</Link>
      </div>
    </>
  )
}

export default Posts;

"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { usePost, usePostDetail, usePostForm, useToken } from '@/atom';
import PostCard from '@/components/PostCard'
import Link from 'next/link';

const Posts = () => {
  const router = useRouter()

  const { posts, setPosts } = usePost();
  const { token, setToken } = useToken();
  const { postForm, setPostForm } = usePostForm();
  const { setPostDetail } = usePostDetail();

  // retrieve token from localstorage
  useEffect(() => {
    const fetchTokenFromLocalStorage = () => {
      try {
        if (typeof window !== 'undefined') {
          const tokenStorage = window.localStorage.getItem('token') || '';
          if (tokenStorage) {
            const parsedToken = JSON.parse(tokenStorage);
            setToken(parsedToken);
          }
        }
      } catch (error) {
        console.error('Error parsing token from localStorage:', error);
      }
    };
    fetchTokenFromLocalStorage();
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
  }, [setPosts, setPostForm, token]);

  const handleClick = async (event: any) => {
    console.log("from handleclick", event)
    setPostDetail(event)
    localStorage.setItem('single post', JSON.stringify(event));
    router.push(`/posts/${event.id}`)
  }
  
  return (
    <>
      <div className='p-10 bg-deep-header'>
        <h1 className='text-center font-mono' style={{fontSize:"2rem"}}>...ALL POSTS...</h1>
      </div>
      <div className='bg-font-blue grid sm:grid-cols-4 md-grid-cols-2 grid-cols-1 gap-5 p-20'>
        { posts.length ?  
            posts.map((post, index) =>
              <PostCard key={index} post={post} handleClick={handleClick} /> 
            ) :
            <h1>No posts yet...</h1>
        }
      </div>
      <div className='p-5 bg-deep-header text-center'>
        <Link href="/dashboard" className='font-mono hover:outline-double'>...Back home...</Link>
      </div>
    </>
  )
}

export default Posts

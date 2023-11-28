"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { usePostDetail, useSelectedPost, useToken, useUserPost } from '@/atom';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

const UserPost = () => {
  const router = useRouter();

  const { userPosts, setUserPosts } = useUserPost();
  const { token } = useToken();
  const { setPostDetail } = usePostDetail();
  const { selectedPost, setSelectedPost } = useSelectedPost();

  // STORE USER POSTS IN LOCAL STORAGE
  useEffect(() => {
    const loadUserPostsFromLocalStorage = () => {
        const storedUserPosts = localStorage.getItem('userPosts');
        return storedUserPosts ? JSON.parse(storedUserPosts) : null;
    };

    const fetchUserPosts = async() => {
      try {
        const response = await fetch('http://localhost:4000/user/posts', {
          headers: {
            Authorization: token && token.accessToken ? `Bearer ${token.accessToken}` : '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setUserPosts(data);
        localStorage.setItem('userPosts', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const storedUserPosts = loadUserPostsFromLocalStorage();

    if (storedUserPosts) {
        setUserPosts(storedUserPosts);
    } else {
        fetchUserPosts();
    }
  }, [setUserPosts, token])

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
        { userPosts.length ?  
            userPosts.map((post,index) =>
              <PostCard key={index} post={post} handleClick={handleClick} />  
            ) :
            <h1>No posts yet...</h1>
        }
        <Link href="/dashboard">Back home</Link>
      </div>
    </>
  )
}

export default UserPost
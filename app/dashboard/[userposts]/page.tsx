"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useEditPost, usePostDetail, usePostForm, useToken, useUser, useUserPost } from '@/atom';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

const UserPost = () => {
  const router = useRouter();

  const { userPosts, setUserPosts } = useUserPost();
  const { token, setToken } = useToken();
  const { setPostDetail } = usePostDetail();
  const { setPostForm } = usePostForm();
  const { setEditPost } = useEditPost();
  const { user } = useUser();

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
  }, [setUserPosts, setPostForm, token]);

  const handleClick = async (event: any) => {
    console.log("from handleclick", event)
    setPostDetail(event)
    localStorage.setItem('single post', JSON.stringify(event))
    router.push(`/posts/${event.id}`)
  }
  
  const handleDelete = async (event: any) => {    
    try {
        const res = await fetch(`http://localhost:4000/posts/${event.id}`, {
            method: "DELETE",
            headers: {
              "Authorization": token && token.accessToken ? `Bearer ${token.accessToken}` : '',
            },
        });
        if (res.ok) {
          await res.json().then(data => {
             // Update state to remove the deleted post
            const updatedPosts = userPosts.filter(post => post.id !== data.id);
            setUserPosts(updatedPosts);

            // Update localStorage to remove the deleted post
            const storedPosts = localStorage.getItem('userPosts');
            const userAllPosts = storedPosts ? JSON.parse(storedPosts) : null;

            if (userAllPosts) {
              const updatedLocalStoragePosts = userAllPosts.filter((post: any) => post.id !== data.id);
              localStorage.setItem('userPosts', JSON.stringify(updatedLocalStoragePosts));
            }

            const storedAllPosts = localStorage.getItem('posts');
            const allPosts = storedAllPosts ? JSON.parse(storedAllPosts) : null;

            if (storedAllPosts) {
              const updatedLocalStoragePosts = allPosts.filter((post: any) => post.id !== data.id);
              localStorage.setItem('posts', JSON.stringify(updatedLocalStoragePosts));
            }
          })
        }
    } catch (error) {
        console.log("Error during deleting post: ", error);
    }
  }

  const handleEdit = async(event: any) => {
    setEditPost({
      id: event.id,
      title: event.title,
      content: event.content,
      created_at: event.created_at,
      updated_at: event.updated_at
    })
    router.push('/update')
  }
  
  return (
    <>
      <div className='p-10 bg-deep-header'>
        <h1 className='text-center font-mono' style={{fontSize:"2rem"}}>...YOUR POSTS...</h1>
      </div>
      <div className='bg-font-blue h-auto'>
        <div className='grid sm:grid-cols-4 md-grid-cols-2 grid-cols-1 gap-5 p-20'>
          { userPosts.length ?  
              userPosts.map((post,index) =>
                <PostCard key={index} post={post} username={user.username} handleClick={handleClick} handleDelete={handleDelete} handleEdit={handleEdit}/>  
              ) :
              <h1>No posts yet...</h1>
          }
        </div>
      </div>
      <div className='p-5 bg-deep-header text-center'>
        <Link href="/dashboard" className='font-mono hover:outline-double'>...Back home...</Link>
      </div>
    </>
  )
}

export default UserPost

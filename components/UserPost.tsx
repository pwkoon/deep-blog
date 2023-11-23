"use client"

import React, { useEffect } from 'react'
import { useToken, useUser, useUserPost } from '@/atom';
import Link from 'next/link';

const UserPost = () => {
    const { userPosts, setUserPosts } = useUserPost();
    const { token } = useToken();
    const { user } = useUser();
    console.log(user)
  
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

    return (
        <>
          <div className='h-screen grid grid-cols-4 gap-4 p-3'>
            { userPosts.length ?     
                userPosts.map((userpost, index) =>  
                    <div className="p-3 max-w-sm rounded overflow-hidden shadow-lg" key={index}>
                      {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{userpost.title}</div>
                        <p className="text-gray-700 text-base">
                          {userpost.content}
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

export default UserPost;
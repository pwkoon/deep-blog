"use client";

import { useEditPost, usePost, useToken, useUser } from '@/atom';
import Loading from '@/components/Loading';
import PostDetail from '@/components/PostDetail';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import withAuth from '@/utils/withAuth';

const PostId = () => {

  const router = useRouter()

  const { token, setToken } = useToken();
  const { posts, setPosts } = usePost();
  const { setEditPost } = useEditPost();
  const { user, setUser } = useUser();

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
        router.push('/login');
      }
    };
    fetchTokenFromLocalStorage();
  }, [])

  // retrieve user from localstorage
  useEffect(() => {
    const fetchTokenFromLocalStorage = () => {
      try {
        if (typeof window !== 'undefined') {
          const userStorage = window.localStorage.getItem('user') || '';
          if (userStorage) {
            const parsedUser = JSON.parse(userStorage);
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Error parsing token from localStorage:', error);
        router.push('/login');
      }
    };
    fetchTokenFromLocalStorage();
  }, [])

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
            const updatedPosts = posts.filter(post => post.id !== data.id);
            setPosts(updatedPosts);

            // Update localStorage to remove the deleted post
            const storedAllPosts = localStorage.getItem('posts');
            const allPosts = storedAllPosts ? JSON.parse(storedAllPosts) : null;

            if (storedAllPosts) {
              const updatedLocalStoragePosts = allPosts.filter((post: any) => post.id !== data.id);
              localStorage.setItem('posts', JSON.stringify(updatedLocalStoragePosts));
            }

            const storedPosts = localStorage.getItem('userPosts');
            const userAllPosts = storedPosts ? JSON.parse(storedPosts) : null;

            if (userAllPosts) {
              const updatedLocalStoragePosts = userAllPosts.filter((post: any) => post.id !== data.id);
              localStorage.setItem('userPosts', JSON.stringify(updatedLocalStoragePosts));
            }

          })
        }
        router.back()
  } catch (error) {
      console.log("Error during deleting post: ", error);
  }
  }

  const handleEdit = async(event: any) => {
  setEditPost({
    id: event.id,
    title: event.title,
    content: event.content,
    photo: event.photo,
    created_at: event.created_at,
    updated_at: event.updated_at,
    user: {username: event.user.username}
  })
  router.push('/update')
  }
    
  const loadSinglePostFromLocalStorage = () => {
    const singlePost = localStorage.getItem('single post');
    return singlePost ? JSON.parse(singlePost) : null;
  };
  const singlePost = loadSinglePostFromLocalStorage();

  return (
    <>
    {token.accessToken ? 
      <PostDetail post={singlePost} username={user.username} handleDelete={handleDelete} handleEdit={handleEdit}/> :
      <Loading />
    }     
    </>
  )
}

export default PostId